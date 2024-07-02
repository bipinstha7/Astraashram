import { FieldErrors } from 'react-hook-form';

type errorNameType = { message: string };

type errorType<T> = { [key in keyof T]: errorNameType };

export interface iAuthFormProps<T> {
  customError: string;
  isSubmitting: boolean;
  register: (arg: keyof T) => {};
  errors: FieldErrors<errorType<T>>;
}
