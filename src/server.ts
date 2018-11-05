import * as Express from 'express'
import { TransactionController } from './controllers/transaction'

class Server {
  private readonly app = Express()
  private readonly transactionController = new TransactionController()

  public start() {
    this.register()
    this.app.listen(3000, () => {
      console.log("Listening...")
    })
  }

  private register() {
    this.app.use("/api/transaction", this.transactionController.router)
  }
}

const server = new Server()
server.start()
