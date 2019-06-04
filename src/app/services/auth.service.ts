import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  public createUser(
    _name: string,
    email: string,
    password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/auth']);
  }

  public initAuthListener() {
    this.afAuth.authState.subscribe((user: User) => {
      console.log(user);
    });
  }

  public isAuthenticated() {
    return this.afAuth.authState.pipe(map((user: User) => {
      if (user == null) {
        this.router.navigate(['/auth']);
      }

      return user != null; })
    );
  }
}
