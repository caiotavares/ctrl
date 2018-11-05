import { Transaction } from "../models/internal/transaction";
import * as UUID from 'uuid/v4'
import { uuid } from "../models/uuid";
import { IDatabase } from "./interface";
import { NotFoundError } from "../errors";

class Mock implements IDatabase {
  private db = {}

  public upsert = (transaction: Transaction) => {
    let id = UUID()
    this.db[id] = transaction
    return id
  }

  public get = (id: uuid) => {
    let transaction = this.db[id]
    if (!transaction) {
      throw new NotFoundError()
    }
    return transaction
  }

  public query = (query: any) => {
    let results = []
    for (const key in this.db) {
      if (this.db.hasOwnProperty(key)) {
        results.push(this.db[key])
      }
    }
    return results
  }
}

export { Mock }
