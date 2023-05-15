import { useEditableControls, ButtonGroup, IconButton } from "@chakra-ui/react";
import React, { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { EditableControlsProps } from "./Input.types";

export const EditableControls: FC<EditableControlsProps> = ({
  portalId,
  removeHandler,
}) => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setNode(document.getElementById(portalId));
  }, [portalId]);

  const renderActionButtons = () => {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<AiOutlineCheck />}
          {...getSubmitButtonProps()}
          aria-label="Confirm edit changes"
        />
        <IconButton
          icon={<RxCross1 />}
          {...getCancelButtonProps()}
          aria-label="Cancel edit operation"
        />
      </ButtonGroup>
    ) : (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          // isLoading
          size="sm"
          icon={<AiOutlineEdit />}
          {...getEditButtonProps()}
          aria-label="Edit todo item"
        />
        <IconButton
          size="sm"
          icon={<AiOutlineDelete />}
          onClick={removeHandler}
          aria-label="Remove todo item"
        />
      </ButtonGroup>
    );
  };

  return portalId
    ? node && createPortal(renderActionButtons(), node)
    : renderActionButtons();
};
