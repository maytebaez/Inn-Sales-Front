import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  headerAgent = false;
  headerAdmin = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.verifyHeader();
  }

  verifyHeader(){
    let user = JSON.parse(localStorage.getItem('user'));

    if(user.us_role == "ADMINISTRATOR"){
      this.headerAdmin = true;
      this.headerAgent = false;
    }else{
      this.headerAdmin = false;
      this.headerAgent = true;
    }
  }

}
