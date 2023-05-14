import { BaseRepo } from "./base";
import { Knex } from "knex";
export interface Task {
  id: number;
  name: string;
  completed: boolean;
  sort: number;
}

export default class TaskRepo extends BaseRepo<Task> {
  protected tableName: string = "tasks";
  constructor(db: Knex) {
    super(db, "tasks");
  }

  async rearrange({
    id,
    src,
    dest,
    action,
  }: {
    id: string;
    src: Task;
    dest: Task;
    action: "increment" | "decrement";
  }) {
    await this.db(this.tableName)
      .whereBetween("sort", [src.sort, dest.sort])
      [action]("sort", 1);
    await this.db(this.tableName)
      .where("id", id)
      .update("sort", action == "increment" ? src.sort : dest.sort);

    return "success";
  }

  getMaxSortNumber() {
    return this.db(this.tableName).max("sort as max").first();
  }

  getSorted() {
    return this.db(this.tableName).orderBy("sort", "asc");
  }
}
