import { RefObject } from "react";

export interface TaskFormFields {
  todo: string;
}

export interface TaskFormProps {
  ref?: RefObject<HTMLFormElement>;
}
