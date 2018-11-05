import { uuid } from "../types/uuid";

export interface IDatabase {
  insert(document: any)
  get(id: uuid)
}