import * as Express from 'express'
import { TransactionController } from './controllers/transaction'
import { Mock as DB } from './db/transaction';

class Server {
  private readonly app = Express()
  private readonly db = new DB()
  private readonly transactionController = new TransactionController(this.db)

  public start() {
    this.register()
    this.app.listen(3000, () => {
      console.log("ctrl started...")
    })
  }

  private register() {
    this.app.use("/api/transaction", this.transactionController.router)
  }
}

const server = new Server()
server.start()
