import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ChangeDivisaComponent } from './components/change-divisa/change-divisa.component';
import { TransaccionComponent } from './pages/transaccion/transaccion.component';
import { FormsModule } from '@angular/forms';

import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ChangeDivisaComponent,
    TransaccionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CountdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
