import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

import { User as FbUser } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    public router: Router,
    private sbar: MatSnackBar,
    private afs: AngularFirestore) {}

  public createUser(
    name: string,
    email: string,
    password: string): void {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user: User = {
          name,
          email: res.user.email,
          uid: res.user.uid
        };

        this.afs.doc(`${environment.cloudFirestorePath}/users/${user.uid}/user`)
          .set(user).then(() => {
            this.router.navigate(['/']);
            this.openSnackBar('user created succesfully', 'close', 2000);
          });
      })
      .catch(err => {
        this.openSnackBar(err.message, 'close', null);
      });
  }

  public signIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.openSnackBar('user logged succesfully', 'close', 2000);
      })
      .catch(err => {
        this.openSnackBar(err.message, 'close', null);
      });
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth']);
      this.openSnackBar('session finished succesfully', 'close', 2000);
    });
  }

  public initAuthListener() {
    this.afAuth.authState.subscribe((user: FbUser) => {
      console.log(user);
    });
  }

  public isAuthenticated() {
    return this.afAuth.authState.pipe(map((user: FbUser) => {
      if (user == null) {
        this.router.navigate(['/auth']);
      }

      return user != null; })
    );
  }

  private openSnackBar(message: string, action: string, duration: any) {
    this.sbar.dismiss();
    this.sbar.open(message, action, { duration });
  }
}
