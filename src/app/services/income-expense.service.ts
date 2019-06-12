import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { SetItemsAction } from '../store/actions/income-expense.actions';
import { AppState } from '../store/app.reducers';

import { filter, map } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { IncomeExpense } from '../models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {
  public userUid: string;
  private subs = new SubSink();

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private store: Store<AppState>
  ) {}

  public createIncomeExpense(incomeExpense: IncomeExpense): Promise<DocumentReference> {
    const user = this.auth.user;
    const path = `${environment.cloudFirestorePath}/users/${user.uid}/income-expenses`;
    return this.afs.doc(path).collection('items').add({ ...incomeExpense });
  }

  public initIncomeExpenseListener(): void {
    this.subs.add(
      this.store.select('auth').pipe(filter(auth => auth.user != null))
        .subscribe(auth => this.getItems(auth.user.uid))
    );
  }

  private getItems(uid: string): void {
    const path = `${environment.cloudFirestorePath}/users/${uid}/income-expenses/items`;

    this.subs.add(
      this.afs.collection(path).snapshotChanges().pipe(
        map(docData => docData.map(doc => {
          return { uid: doc.payload.doc.id, ...doc.payload.doc.data() } as IncomeExpense;
        })))
      .subscribe((collection: IncomeExpense[]) => {
        this.store.dispatch(new SetItemsAction(collection));
      })
    );
  }

  public cleanSubscriptions(): void {
    this.subs.unsubscribe();
  }

  public delete(uid: string): Promise<void> {
    const user = this.auth.user;
    const path = `${environment.cloudFirestorePath}/users/${user.uid}/income-expenses/items/${uid}`;
    return this.afs.doc(path).delete();
  }
}
