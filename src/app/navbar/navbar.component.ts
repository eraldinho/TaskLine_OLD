import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.currentUser = this.afAuth.authState;
    this.afAuth.authState.subscribe(userData => {
      if (userData !== null) {
        this.currentUser = userData.email;
      }
    });
  }

  logout() {
    this.auth.signOut();
  }

}
