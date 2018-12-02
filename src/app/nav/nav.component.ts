import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { trigger, transition, query, group, style, animate, state, animateChild } from '@angular/animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('parentMenuToggle', [
      state('open', style({ marginLeft: '-20%' })),
      state('closed', style({ marginLeft: '0%' })),
      transition('* <=> *', [
        group([
          query('@childMenuToggle', animateChild()),
          animate('0.6s cubic-bezier(0.55, 0.31, 0.15, 0.93)'),
        ])
      ])
    ]),
    trigger('childMenuToggle', [
      state('open', style({ marginLeft: '20%', opacity: 1 })),
      state('closed', style({ marginLeft: '100%', opacity: 0 })),
      transition('* <=> *', [
        animate('0.6s cubic-bezier(0.55, 0.31, 0.15, 0.93)'),
      ])
    ])
  ]
})
export class NavComponent implements OnInit {

  private menuOpen = false;
  private isLogged  = false;
  private userData  = Array();

  @Input() logging = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isLogged = this.authService.isSignin();
    this.userData = this.authService.getSessionData();

    // const $cont    = $( 'div.nav-wrap > div.nav-cont > ul > li > a' );
    // const $subcont = $( 'li.nav-item > div.nav-cont > ul > li > a' );

    // $cont.on('click', function() {
    //   $( this ).next().css({ display: 'block' }).animate({ opacity: 1, marginLeft: '40%' }, 400);
    //   $( this ).parents('.nav-cont').animate({ marginLeft: '-40%' }, 400);
    // });

  }

  onAnimationEvent(event: AnimationEvent) {
    console.log( event );
    if (!this.logging) {
      return;
    }
  }

  toggleMenus() {
    if ( this.menuOpen ) {
      this.menuOpen = false;
    } else {
      this.menuOpen = true;
    }
  }

  signOut() {
    if ( this.authService.isSignin() ) {
      this.authService.logout();
      this.router.navigate(['home']);
    }
  }

}
