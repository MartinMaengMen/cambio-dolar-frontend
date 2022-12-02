import { DivisaService } from '../../_service/divisa.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  handleLogin() {
    this.router.navigate(['login']);
  }
}
