import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [TransaccionComponent, LandingPageComponent],
  imports: [CommonModule, ComponentsModule],
})
export class PagesModule {}
