import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { CustomModal } from "./modal.types";

export const Modal: FC<CustomModal> = ({
  isOpen,
  onClose,
  onOpen,
  title,
  hideActionButton,
  hideCloseButton,
  hideDefaultOpenBtn,
  actionButtonText = "Okay",
  actionHandler,
  openBtnText,
  children,
  closeBtnText,
  ...rest
}) => {
  const {
    isOpen: isOpenDefault,
    onOpen: onOpenDefault,
    onClose: onCloseDefault,
  } = useDisclosure();

  return (
    <>
      {!hideDefaultOpenBtn && (
        <Button onClick={onOpen || onOpenDefault}>
          {openBtnText || "Open Modal"}
        </Button>
      )}

      <ChakraModal
        isOpen={isOpen || isOpenDefault}
        onClose={onClose || onCloseDefault}
        {...rest}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          <ModalFooter>
            {!hideCloseButton && (
              <Button
                colorScheme="blue"
                variant={"ghost"}
                mr={3}
                onClick={onClose || onCloseDefault}
              >
                {closeBtnText || "Close"}
              </Button>
            )}
            {!hideActionButton && (
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={
                  (() => {
                    actionHandler?.();
                    onCloseDefault();
                  }) || onCloseDefault
                }
              >
                {actionButtonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};
