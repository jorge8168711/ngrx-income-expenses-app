
export interface IncomeExpenseData {
  description: string;
  amount: number;
  type: string;
  uid?: string;
}
export class IncomeExpense {
  public description: string;
  public amount: number;
  public type: string;
  public uid?: string;

  constructor(obj: IncomeExpenseData) {
    this.description = obj && obj.description || null;
    this.amount = obj && obj.amount || null;
    this.type = obj && obj.type || null;
  }
}
