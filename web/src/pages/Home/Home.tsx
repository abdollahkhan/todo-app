import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Container,
  Checkbox,
  Heading,
} from "@chakra-ui/react";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
  useUpdateTaskOrderMutation,
} from "../../redux/services/tasks.service";
import { Input, Modal, StrictModeDroppable } from "../../components";
import { TaskForm } from "../../components";
import {
  DragDropContext,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  OnDragEndResponder,
  DraggingStyle,
} from "react-beautiful-dnd";
import {
  ContainerStyles,
  MainHeadingStyles,
  getItemStyle,
  getListStyle,
} from "./home.styles";
import { ReorderAction, Task } from "../../lib/types";

export const Home = () => {
  const [todos, setTodos] = useState<Array<Task>>([]);

  const { data } = useGetTasksQuery("");

  const [deleteTask] = useDeleteTaskMutation();
  const [rearrange] = useUpdateTaskOrderMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  const modalActionHandler = () => formRef.current?.requestSubmit();

  const handleRemove = (id: string) => {
    deleteTask(id);
  };

  const handleUpdate = (data: Task) => {
    updateTask(data);
  };

  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd: OnDragEndResponder = async ({
    destination,
    source,
    draggableId,
  }) => {
    if (!destination || destination.index === source.index) {
      return;
    }

    let action, src, dest;

    if (source.index < destination.index) {
      action = ReorderAction.DECREMENT;
      src = todos[source.index + 1];
      dest = todos[destination.index];
    } else {
      action = ReorderAction.INCREMENT;
      src = todos[destination.index];
      dest = todos[source.index - 1];
    }

    const items: Task[] = reorder(todos, source.index, destination.index);
    await rearrange({ action, src, dest, id: draggableId });

    setTodos(items);
  };

  const renderTodos = () => {
    return (
      <>
        {todos?.length ? (
          todos.map((item: Task, index: number) => (
            <Tr key={item.id}>
              <Td>
                <Checkbox
                  colorScheme="green"
                  defaultChecked={item.completed}
                  disabled={isUpdating}
                  display={"inline"}
                  onChange={(val) => {
                    handleUpdate({ ...item, completed: val.target.checked });
                  }}
                ></Checkbox>
              </Td>
              <Td>
                <Draggable
                  key={String(item.id)}
                  draggableId={String(item.id)}
                  index={index}
                >
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <Box
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={
                        getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        ) as DraggingStyle
                      }
                    >
                      <Input
                        editable={true}
                        editableOptions={{
                          onSubmit: (newVal) =>
                            handleUpdate({ ...item, name: newVal }),
                          defaultValue: item.name,
                          inPortal: true,
                          removeHandler: () => {
                            handleRemove(item.id as string);
                          },
                          portalOptions: {
                            portalId: `todo-${item.id}`,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Draggable>
              </Td>
              <Td id={`todo-${item.id}`}></Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={3}>No Tasks Found!</Td>
          </Tr>
        )}
      </>
    );
  };

  return (
    <Container {...ContainerStyles}>
      <Heading {...MainHeadingStyles}>List of Todos</Heading>
      <Modal
        title="New Task"
        openBtnText="Add a new task"
        actionButtonText="Submit"
        actionHandler={modalActionHandler}
        closeBtnText="Cancel"
        isCentered={true}
        size={"xl"}
      >
        <TaskForm ref={formRef} />
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <>
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                width={"100%"}
              >
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Status</Th>
                        <Th>ToDo Items</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{renderTodos()}</Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Status</Th>
                        <Th>ToDo Items</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Box>
              {provided.placeholder}
            </>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </Container>
  );
};
