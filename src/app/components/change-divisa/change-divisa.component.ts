import { Component, Input } from '@angular/core';
import { DivisaService } from 'src/app/_service/divisa.service';

@Component({
  selector: 'app-change-divisa',
  templateUrl: './change-divisa.component.html',
  styleUrls: ['./change-divisa.component.css'],
})
export class ChangeDivisaComponent {
  public compra: number = 0;
  public venta: number = 0;
  public value: number = 0;
  public valSoles: number = 0;
  public cambioDolar: number = 0;
  public cambioSoles: number = 0;
  public isDollar: boolean = false;

  @Input() isAuthChild: string = 'activo';

  constructor(private divisaService: DivisaService) {
    this.divisaService.getDivisa().subscribe((res) => {
      this.compra = res.compra;
      this.venta = res.venta;
    });
  }

  changeToSoles(value: string) {
    this.value = +value;
    const operacion = this.value * this.compra;
    this.cambioDolar = Math.round((operacion + Number.EPSILON) * 100) / 100;
  }

  changeToDollar(value: string) {
    this.valSoles = +value;
    const operacion = this.valSoles / this.venta;
    this.cambioSoles = Math.round((operacion + Number.EPSILON) * 100) / 100;
  }

  buttonChange() {
    this.isDollar = !this.isDollar;
    this.cambioDolar = 0;
    this.cambioSoles = 0;
  }
  showBtnIfAuth() {
    if (this.isAuthChild === 'inactivo') {
      return false;
    }
    return true;
  }
}
