import { TransactionWire } from "../models/wire/transaction";
import { Transaction, TransactionType } from "../models/internal/transaction";

export function fromWire(wire: TransactionWire): Transaction {
  return {
    type: wire.type === "debit" ? TransactionType.debit : TransactionType.credit,
    date: new Date(wire.date),
    amount: wire.amount,
    description: wire.description
  }
}

export function fromInternal(transaction: Transaction): TransactionWire {
  return {
    type: transaction.type === TransactionType.credit ? "credit" : "debit",
    amount: transaction.amount,
    description: transaction.description,
    date: transaction.date.toDateString()
  }
}
