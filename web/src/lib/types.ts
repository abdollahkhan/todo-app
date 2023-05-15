export type Task = {
  id?: string;
  name: string;
  completed: boolean;
  sort?: number;
};

export enum ReorderAction {
  INCREMENT = "increment",
  DECREMENT = "decrement",
}
export type ReorderMutaionArgs = {
  action: ReorderAction;
  src: Task;
  dest: Task;
  id: string;
};
