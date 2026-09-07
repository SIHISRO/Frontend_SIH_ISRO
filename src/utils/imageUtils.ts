/**
 * Image Utilities for File Validation and Export
 */

export const SUPPORTED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const MAX_FILE_SIZE_MB = 25; // High resolution lunar images up to 25MB

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateImageFile(
  file: File,
  maxSizeMB: number = MAX_FILE_SIZE_MB
): ValidationResult {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  // Type validation
  if (!SUPPORTED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Unsupported format "${file.type || 'unknown'}". Only JPEG and PNG formats are supported.`,
    };
  }

  // Size validation
  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a smaller image.`,
    };
  }

  return { valid: true };
}

export function createPreviewURL(file: File): string {
  return URL.createObjectURL(file);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function downloadBase64Image(dataUri: string, filename: string): void {
  if (!dataUri) return;
  const link = document.createElement("a");
  link.href = dataUri;
  link.download = filename.endsWith(".jpg") || filename.endsWith(".png") ? filename : `${filename}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
