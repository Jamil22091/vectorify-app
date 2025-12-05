export interface VectorStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
  mimeType: string | null;
}

export interface GenerationResult {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}
