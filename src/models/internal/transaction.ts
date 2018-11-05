enum TransactionType {
  debit,
  credit
}

type Transaction = {
  type: TransactionType
  amount: number
  description: string
  date: Date
}

export { TransactionType, Transaction }