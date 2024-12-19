import { AfterViewInit, ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements AfterViewInit {
  isHandset$: Observable<boolean>;
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild(MatSidenav) sidenav?: MatSidenav;
  isAuthenticated$ = inject(AuthService).isAuthenticated$.pipe(shareReplay());

  constructor() {
    this.isHandset$ = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((result) => result.matches),
        shareReplay(),
      );
  }

  ngAfterViewInit(): void {
    this.isHandset$
      .pipe(filter(isHandset => !isHandset))
      .subscribe(isHandset => {
        if (isHandset) {
          console.log('Mobile mode');
        } else {
          console.log('Desktop mode');
          this.sidenav?.open();
        }
      });
  }
}
