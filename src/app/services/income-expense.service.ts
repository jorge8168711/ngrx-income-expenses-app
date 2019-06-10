import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { IncomeExpense } from '../models';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {}

  public createIncomeExpense(incomeExpense: IncomeExpense): Promise<DocumentReference> {
    const user = this.auth.user;
    const path = `${environment.cloudFirestorePath}/users/${user.uid}/income-expenses`;
    return this.afs.doc(path).collection('items').add({ ...incomeExpense });
  }
}
