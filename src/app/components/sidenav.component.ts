import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthService } from '../services';
import { UiState, AuthState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-sidenav',
  template: /*html*/ `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" [fixedInViewport]="true"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false">

        <mat-toolbar>Turtle...</mat-toolbar>

        <section>
          <p>{{ (userState$ | async).user?.name }}</p>
          <p>{{ (userState$ | async).user?.email }}</p>
        </section>

        <button mat-button
          type="button"
          aria-label="Logout"
          (click)="logout()">
          Logout
        </button>

        <!-- <mat-nav-list>
          <a mat-list-item routerLink="/">Dashboard</a>
        </mat-nav-list> -->
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>

          <span>Turtle...</span>
        </mat-toolbar>

        <mat-progress-bar mode="query"
          *ngIf="(loadingState$ | async).isLoadig">
        </mat-progress-bar>

        <main class="main">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [ /*css*/`
    mat-sidenav-content.mat-drawer-content,
    .sidenav-container {
      min-height: 100vh;
    }

    .sidenav {
      width: 220px;
    }

    .main {
      padding: 20px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {
  public userState$: Observable<AuthState>;
  public loadingState$: Observable<UiState>;
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe( map(result => result.matches) );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private store: Store<AppState>,
    private incomeExpense: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.loadingState$ = this.store.select('ui');
    this.userState$ = this.store.select('auth');
  }

  public logout() {
    this.auth.logout();
    this.incomeExpense.cleanSubscriptions();
  }
}
