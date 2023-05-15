import { EditableProps, InputProps } from "@chakra-ui/react";
import { RefCallback } from "react";

export interface CustomInput extends InputProps {
  editable?: boolean;
  editableOptions?: CustomEditable;
  ref?: RefCallback<HTMLInputElement>;
}

interface CustomEditable extends EditableProps {
  inPortal?: boolean;
  portalOptions?: PortalOptions;
  removeHandler: () => void;
}

interface PortalOptions {
  portalId: string;
}

export interface EditableControlsProps extends PortalOptions {
  removeHandler: () => void;
}
