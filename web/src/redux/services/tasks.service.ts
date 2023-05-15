import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL, API_CACHE_TAGS, HTTP } from "../../lib/constants";
import { ReorderMutaionArgs, Task } from "../../lib/types";

const { TASKS } = API_CACHE_TAGS;

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/tasks/`,
  }),
  tagTypes: [TASKS],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => `/`,
      transformResponse: (response: any) => response.tasks,
      providesTags: [TASKS],
    }),

    createTask: builder.mutation({
      query: (data: Task) => ({ url: `/`, method: HTTP.POST, body: data }),
      invalidatesTags: [TASKS],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => ({ url: `/${id}`, method: HTTP.DELETE }),
      invalidatesTags: [TASKS],
    }),

    updateTask: builder.mutation({
      query: (data: Partial<Task>) => ({
        url: `/${data.id}`,
        method: HTTP.PATCH,
        body: data,
      }),
      invalidatesTags: [TASKS],
    }),

    updateTaskOrder: builder.mutation({
      query: (data: ReorderMutaionArgs) => ({
        url: `/rearrange/${data.id}`,
        method: HTTP.PATCH,
        body: data,
      }),
      invalidatesTags: [TASKS],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskOrderMutation,
} = tasksApi;
