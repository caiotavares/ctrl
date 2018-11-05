import { uuid } from "../models/uuid";

export interface IDatabase {
  upsert(document: any)
  get(id: uuid)
  query(query: any)
}