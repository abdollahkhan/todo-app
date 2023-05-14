import { Knex } from "knex";
export class BaseRepo<T extends {}> {
  protected tableName: string;
  protected db: Knex;
  constructor(db: Knex, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  public async find() {
    return await this.db(this.tableName).select<T>();
  }

  public async create(data: Omit<T, "id">) {
    return await this.db(this.tableName).insert(data);
  }

  public async delete(id: string) {
    return await this.db(this.tableName).where("id", id).del();
  }

  public async update(id: string, data: T) {
    return await this.db(this.tableName).where("id", id).update(data);
  }
}
