import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 120; // 120 seconds timeout for LoFTR inference

export async function POST(req: NextRequest) {
  const backendBaseUrl = process.env.FASTAPI_BASE_URL || "http://localhost:8000";
  const targetUrl = `${backendBaseUrl.replace(/\/+$/, "")}/api/v1/predict`;

  try {
    const incomingFormData = await req.formData();
    const image1 = incomingFormData.get("image1");
    const image2 = incomingFormData.get("image2");

    if (!image1 || !(image1 instanceof Blob)) {
      return NextResponse.json(
        { detail: "Missing or invalid 'image1' (Reference Image)." },
        { status: 422 }
      );
    }

    if (!image2 || !(image2 instanceof Blob)) {
      return NextResponse.json(
        { detail: "Missing or invalid 'image2' (Source Image)." },
        { status: 422 }
      );
    }

    const outgoingFormData = new FormData();
    outgoingFormData.append("image1", image1, (image1 as File).name || "reference.jpg");
    outgoingFormData.append("image2", image2, (image2 as File).name || "source.jpg");

    // 120 second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      const backendResponse = await fetch(targetUrl, {
        method: "POST",
        body: outgoingFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseData = await backendResponse.json();

      if (!backendResponse.ok) {
        return NextResponse.json(
          responseData,
          { status: backendResponse.status }
        );
      }

      return NextResponse.json(responseData, { status: 200 });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          {
            detail:
              "Inference timed out after 120 seconds. LoFTR model processing on high-resolution imagery took too long.",
          },
          { status: 504 }
        );
      }

      console.error("FastAPI Backend connection error:", fetchError);
      return NextResponse.json(
        {
          detail: `Could not connect to FastAPI registration backend at ${targetUrl}. Ensure the backend service is running on port 8000.`,
        },
        { status: 502 }
      );
    }
  } catch (error: unknown) {
    console.error("Proxy handler error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
