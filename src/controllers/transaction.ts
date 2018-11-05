import { Router, Request, BaseController, handle } from './base';
import { TransactionWire } from '../models/wire/transaction';
import { flow } from '../utils/fp'
import * as TransactionAdapter from '../adapters/transaction';
import * as Logic from '../logic/transaction';
import { IDatabase } from '../db/interface';

function query(db: IDatabase) {
  return (req: Request) => {
    let query = req.query
    let results = flow(query,
      db.query,
      (results) => results.map(TransactionAdapter.fromInternal))
    return { status: 200, result: results }
  }
}

function get(db: IDatabase) {
  return (req: Request) => {
    let id = req.params["id"]
    let result = flow(id,
      db.get,
      TransactionAdapter.fromInternal)
    return { status: 200, result: result }
  }
}

function insert(db: IDatabase) {
  return (req: Request) => {
    let transaction: TransactionWire = req.body
    let result = flow(transaction,
      TransactionAdapter.fromWire,
      Logic.validate,
      db.upsert
    )
    return { status: 201, result: result }
  }
}

export class TransactionController extends BaseController {
  private db;

  constructor(db: IDatabase) {
    super()
    this.db = db
  }

  registerRoutes(router: Router) {
    router.get('/', (req, res) => handle(query(this.db), req, res))
    router.put('/', (req, res) => handle(insert(this.db), req, res))
    router.get('/:id', (req, res) => handle(get(this.db), req, res))
  }
}
