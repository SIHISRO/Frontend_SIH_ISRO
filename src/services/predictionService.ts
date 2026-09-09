import { PredictResponse } from "@/types/prediction";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Calls Next.js proxy route /api/predict which forwards to FastAPI /api/v1/predict
 * Note:
 *   image1 -> Reference (LRO NAC / SELENE / Fixed Target)
 *   image2 -> Source (Chandrayaan-2 OHRC / TMC-2 / IIRS / Moving Image)
 */
export async function predictImageRegistration(
  reference: File,
  source: File,
  signal?: AbortSignal
): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append("ref_img", reference, reference.name);
  formData.append("src_img", source, source.name);
  formData.append("image1", reference, reference.name);
  formData.append("image2", source, source.name);

  let response: Response;

  try {
    response = await fetch("/api/predict", {
      method: "POST",
      body: formData,
      signal,
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError("Registration request was cancelled or timed out.", 504);
    }
    throw new ApiError(
      "Network connection failure. Please check if the client application is able to send requests.",
      0
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(
      `Received invalid response from server (HTTP ${response.status}).`,
      response.status
    );
  }

  if (!response.ok) {
    const errorObj = data as { detail?: string | Array<{ msg?: string; loc?: string[] }> };
    let errorMsg = "Registration failed.";

    if (typeof errorObj?.detail === "string") {
      errorMsg = errorObj.detail;
    } else if (Array.isArray(errorObj?.detail) && errorObj.detail.length > 0) {
      errorMsg = errorObj.detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
    }

    if (response.status === 422) {
      throw new ApiError(
        `Validation Error: ${errorMsg}. Please verify image format and dimensions.`,
        422,
        data
      );
    }

    if (response.status === 502) {
      throw new ApiError(
        `Backend Offline: ${errorMsg}`,
        502,
        data
      );
    }

    if (response.status === 504) {
      throw new ApiError(
        `Inference Timeout: ${errorMsg}`,
        504,
        data
      );
    }

    throw new ApiError(
      `Server Error (${response.status}): ${errorMsg}`,
      response.status,
      data
    );
  }

  return data as PredictResponse;
}
