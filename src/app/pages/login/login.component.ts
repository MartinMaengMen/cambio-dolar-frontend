import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup
  user : User
  constructor(private userService : UserService) {
    this.user = new User()
    this.form = new FormGroup({
      'email' : new FormControl('', {nonNullable: true}),
      'password' : new FormControl('', {nonNullable: true}),
    })
  }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.user.email = this.form.value['email'];
    this.user.password = this.form.value['password'];
    this.userService.login(this.user).subscribe(response => {
      console.log(response)
    });
  }
}
