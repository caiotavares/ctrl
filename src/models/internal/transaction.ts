enum TransactionType {
  debit,
  credit
}

class Transaction {
  public type: TransactionType
  public amount: number
  public description: string
  public date: Date
}

export { TransactionType, Transaction }