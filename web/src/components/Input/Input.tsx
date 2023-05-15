import {
  Editable,
  EditablePreview,
  Input as ChakraInput,
  EditableInput,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";

import { CustomInput } from "./Input.types";
import { EditableControls } from "./EditableControls";

export const Input = forwardRef<HTMLInputElement, CustomInput>(
  (
    {
      editable = false,
      editableOptions: {
        onSubmit = () => {},
        defaultValue = "",
        inPortal = false,
        portalOptions: { portalId = null } = {},
        removeHandler = () => {},
      } = {},
      ...rest
    },
    ref
  ) => {
    return editable ? (
      <Editable
        defaultValue={defaultValue}
        onSubmit={onSubmit}
        isPreviewFocusable={false}
        onEnded={() => {
          console.log("heeee");
        }}
      >
        <EditablePreview />
        <ChakraInput as={EditableInput} {...rest} ref={ref} />
        <EditableControls
          portalId={(inPortal && portalId) || ""}
          removeHandler={removeHandler}
        />
      </Editable>
    ) : (
      <ChakraInput {...rest} ref={ref} />
    );
  }
);
