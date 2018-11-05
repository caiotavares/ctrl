import { Transaction } from "../models/internal/transaction";
import * as UUID from 'uuid/v4'
import { uuid } from "../types/uuid";
import { IDatabase } from "./interface";
import { NotFoundError } from "../errors";

class Mock implements IDatabase {

  constructor() {
    console.log('New DB')
  }

  private db = {}

  public insert = (transaction: Transaction) => {
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
}

export { Mock }
