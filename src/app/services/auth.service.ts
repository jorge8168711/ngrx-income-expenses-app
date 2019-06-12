import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User as FbUser } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as fromUi from '../store/actions';
import * as fromAuth from '../store/actions';
import * as fromIncomeExpense from '../store/actions';

import { User } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubscription: Subscription = new Subscription();
  // tslint:disable-next-line: variable-name
  private _user: User;

  constructor(
    public router: Router,
    private sbar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private store: Store<AppState>
  ) {}

  public createUser(name: string, email: string, password: string): void {
    this.store.dispatch(new fromUi.ActivateLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      const user: User = { name, email: res.user.email, uid: res.user.uid };
      const path = `${environment.cloudFirestorePath}/users/${user.uid}/user`;

      this.afs.doc(path).set(user).then(() => {
        this.router.navigate(['/']);
        this.store.dispatch(new fromUi.InactivateLoadingAction());
        this.openSnackBar('user created succesfully', 'close', 2000);
      });
    })
    .catch(err => {
      this.store.dispatch(new fromUi.InactivateLoadingAction());
      this.openSnackBar(err.message, 'close', null);
    });
  }

  public signIn(email: string, password: string): void {
    this.store.dispatch(new fromUi.ActivateLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/']);
      this.store.dispatch(new fromUi.InactivateLoadingAction());
      this.openSnackBar('user logged succesfully', 'close', 2000);
    })
    .catch(err => {
      this.store.dispatch(new fromUi.InactivateLoadingAction());
      this.openSnackBar(err.message, 'close', null);
    });
  }

  public logout(): void {
    this.store.dispatch(new fromUi.ActivateLoadingAction());

    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth']);
      this.store.dispatch(new fromUi.InactivateLoadingAction());
      this.store.dispatch(new fromIncomeExpense.UnsetItemsAction());
      this.openSnackBar('session finished succesfully', 'close', 2000);
    });
  }

  public initAuthListener(): void {
    this.afAuth.authState.subscribe((user: FbUser) => {
      if (user) {
        const path = `${environment.cloudFirestorePath}/users/${user.uid}/user`;

        this.userSubscription = this.afs.doc(path).valueChanges()
          .subscribe((fbUSer: User) => {
            this.store.dispatch(new fromAuth.SetUserAction(fbUSer as User));
            this.user = fbUSer;
          });
      } else {
        this.userSubscription.unsubscribe();
        this.user = null;
        this.store.dispatch(new fromAuth.UnsetUserAction());
      }
    });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user: FbUser) => {
      if (user == null) {
        this.router.navigate(['/auth']);
      }

      return user != null;
    }));
  }

  private openSnackBar(message: string, action: string, duration: any): void {
    this.sbar.dismiss();
    this.sbar.open(message, action, { duration });
  }

  public set user(user: User) {
    this._user = user;
  }

  public get user(): User {
    return { ...this._user };
  }
}
