import { Request, BaseController, handle } from './base';
import { TransactionWire } from '../models/wire/transaction';
import { flow } from '../utils/fp'
import * as TransactionAdapter from '../adapters/transaction';
import * as Logic from '../logic/transaction';
import { Mock as DB } from '../db/transaction';
import { uuid } from '../types/uuid';
import { IDatabase } from '../db/interface';

function getTransaction(db: IDatabase) {
  return (req: Request) => {
    let id: uuid = req.params["id"]
    let result = flow(id,
      db.get,
      TransactionAdapter.fromInternal)
    return { result: result, status: 200 }
  }
}

function newTransaction(db: IDatabase) {
  return (req: Request) => {
    let transaction: TransactionWire = req.body
    let result = flow(transaction,
      TransactionAdapter.fromWire,
      Logic.validate,
      db.insert
    )
    return { result: result, status: 201 }
  }
}

export class TransactionController extends BaseController {
  private db = new DB()

  registerRoutes(router) {
    router.get('/:id', (req, res) => handle(getTransaction(this.db), req, res))
    router.put('/', (req, res) => handle(newTransaction(this.db), req, res))
  }
}
