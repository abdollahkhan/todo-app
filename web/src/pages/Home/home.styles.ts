import { BoxProps, ContainerProps, HeadingProps } from "@chakra-ui/react";
import { DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";

export const FLoatingButtonStyles: BoxProps = {
  position: "absolute",
  right: 20,
  bottom: 0,
};

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  userSelect: "none",
  padding: 8,
  background: isDragging ? "teal" : "",
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "",
  padding: 8,
});

export const ContainerStyles: ContainerProps = {
  display: "flex",
  flexDirection: "column",
  minH: "100vh",
  justifyContent: "center",
};

export const MainHeadingStyles: HeadingProps = {
  textAlign: "center",
  marginTop: "30px",
  marginBottom: "30px",
};
