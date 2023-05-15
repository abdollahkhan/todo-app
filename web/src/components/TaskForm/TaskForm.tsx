import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { Input } from "../Input";
import { TaskFormProps, TaskFormFields } from "./taskForm.types";
import { useCreateTaskMutation } from "../../redux/services/tasks.service";

export const TaskForm = forwardRef<HTMLFormElement, TaskFormProps>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TaskFormFields>();

    const [createTask] = useCreateTaskMutation();

    const onSubmit: SubmitHandler<TaskFormFields> = ({ todo }) => {
      createTask({ name: todo, completed: false });
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <FormControl isInvalid={!!errors.todo}>
          <FormLabel>Task Name *</FormLabel>
          <Input
            {...register("todo", {
              required: "Task name is required",
            })}
          />
          {!errors.todo ? (
            <FormHelperText>
              Type anything you want to have in your bucket list.
            </FormHelperText>
          ) : (
            <FormErrorMessage>{errors.todo.message}</FormErrorMessage>
          )}
        </FormControl>
      </form>
    );
  }
);
