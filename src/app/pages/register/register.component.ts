import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form : FormGroup
  user : User
  constructor(private userService : UserService) {
    this.user = new User()
    this.form = new FormGroup({
      'email' : new FormControl('', {nonNullable: true}),
      'password' : new FormControl('', {nonNullable: true}),
      'dni' : new FormControl('', {nonNullable: true}),
      'name' : new FormControl('', {nonNullable: true}),
      'surname' : new FormControl('', {nonNullable: true}),
    })
  }

  ngOnInit(): void {
  }
  onSubmit():void{
    this.user.email = this.form.value['email'];
    this.user.password = this.form.value['password'];
    this.user.dni = this.form.value['dni'];
    this.user.name = this.form.value['name'];
    this.user.surname = this.form.value['surname'];
    this.userService.login(this.user).subscribe(response => {
      console.log(response)
    });
  }
}
