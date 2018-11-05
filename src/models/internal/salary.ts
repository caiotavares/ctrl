class Salary {
  public readonly taxes: Taxes
  public readonly amount: number

  constructor(amount) {
    this.taxes = new Taxes(amount)
    this.amount = amount
  }
}

class Taxes {
  public INSS: number
  public IR: number

  constructor(amount: number) {
    this.INSS = inss(amount)
    this.IR = ir(amount, this.INSS)
  }
}

function inss(amount: number): number {
  if (amount < 1556.94) { return amount * 0.08 }
  else if (amount < 2594.92) { return amount * 0.09 }
  else if (amount < 5531.31) { return amount * 0.11 }
  else { return 621.03 }
}

function ir(amount: number, inss: number): number {
  if (amount < 1903.98) { return 0 }
  else if (amount < 2826.65) { return ((amount - inss) * 0.075) - 142.8 }
  else if (amount < 3751.05) { return ((amount - inss) * 0.15) - 354.8 }
  else if (amount < 4664.08) { return ((amount - inss) * 0.225) - 636.13 }
  else { return ((amount - inss) * 0.275) - 869.36 }
}

export { Salary }
