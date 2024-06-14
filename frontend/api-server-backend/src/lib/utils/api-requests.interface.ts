export type User = {
  id: number;
  name: string;
  email: string;
};

interface iError {
  error: string;
  statusCode: number;
}
export interface iApiValidationError extends iError {
  message: { property: string; message: string }[];
}

export interface iApiError extends iError {
  message: string;
}
