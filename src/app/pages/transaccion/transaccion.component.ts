import { BackServiceService } from './../../_service/back-service.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/_model/card.response';
import { DivisaService } from 'src/app/_service/divisa.service';
import { SuccessChange } from 'src/app/_model/successChange';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css'],
})
export class TransaccionComponent {
  public isDollar: boolean = false;
  public isAuth: string = 'inactivo';
  public inputSoles: string = '';
  public inputDollar: string = '';
  public timeout: any;
  public errorMessageSoles: string = '';
  public errorMessageDollar: string = '';
  public errorMessageMoneyToChange: string = '';
  public isValueSolesInputCorrect: boolean = false;
  public isValueDollarInputCorrect: boolean = false;
  public isValueMoneyCorrect: boolean = false;
  public AccountSoles: Card = {
    updatedAt: '',
    availableMoney: '',
    typeCard: '',
    createdAt: '',
    id: '',
    accountNumber: '',
  };
  public AccountDollar: Card = {
    updatedAt: '',
    availableMoney: '',
    typeCard: '',
    createdAt: '',
    id: '',
    accountNumber: '',
  };
  public inputMoneytoChange: string = '';
  public compra: number = 0;
  public venta: number = 0;
  public successChange: SuccessChange = {
    isSuccess: false,
    message: '',
  };

  constructor(
    private bankService: BackServiceService,
    private divisaService: DivisaService,
    private router: Router
  ) {
    this.divisaService.getDivisa().subscribe((res) => {
      this.compra = res.compra;
      this.venta = res.venta;
    });
  }
  buttonChange(value: boolean) {
    this.isDollar = value;
    this.inputSoles = '';
    this.inputDollar = '';
    this.inputMoneytoChange = '';
    this.isValueSolesInputCorrect = false;
    this.isValueDollarInputCorrect = false;
    this.isValueMoneyCorrect = false;
  }
  styleChangeSoles() {
    if (this.isDollar) {
      return 'header-soles';
    }
    return '';
  }
  styleChangeDolar() {
    if (!this.isDollar) {
      return 'header-dolar';
    }
    return '';
  }

  addStyleStateInputSoles() {
    if (this.isValueSolesInputCorrect) {
      return 'input-soles-correct';
    }
    return 'input-soles-error';
  }

  addStyleStateInputDollar() {
    if (this.isValueDollarInputCorrect) {
      return 'input-dollar-correct';
    }
    return 'input-dollar-error';
  }
  addStyleStateInputMoney() {
    if (this.isValueMoneyCorrect) {
      return 'input-money-correct';
    }
    return 'input-money-error';
  }
  getAccountSoles() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.bankService.getCard(this.inputSoles).subscribe(
        (res) => {
          this.AccountSoles = res;
          this.isValueSolesInputCorrect = true;
          if (this.AccountSoles.typeCard !== 'soles') {
            this.errorMessageSoles =
              'La cuenta ingresada debe ser cuenta soles';
            this.isValueSolesInputCorrect = false;
          }
        },
        (err) => {
          this.errorMessageSoles = err.error.message;
          this.isValueSolesInputCorrect = false;
        }
      );
    }, 2000);
  }

  getAccountDollar() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.bankService.getCard(this.inputDollar).subscribe(
        (res) => {
          this.AccountDollar = res;

          this.isValueDollarInputCorrect = true;
          if (this.AccountDollar.typeCard !== 'dolares') {
            this.errorMessageDollar =
              'La cuenta ingresada debe ser cuenta dolares';
            this.isValueDollarInputCorrect = false;
          }
        },
        (err) => {
          this.errorMessageDollar = err.error.message;
          this.isValueDollarInputCorrect = false;
        }
      );
    }, 2000);
  }

  evaluateSolesMoneyBeforeChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (+this.AccountSoles.availableMoney < +this.inputMoneytoChange) {
        this.errorMessageMoneyToChange =
          'El monto ingresado es superior al saldo de la cuenta';
        return (this.isValueMoneyCorrect = false);
      }
      return (this.isValueMoneyCorrect = true);
    }, 2000);
  }

  evaluateDollarMoneyBeforeChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (+this.AccountDollar.availableMoney < +this.inputMoneytoChange) {
        this.errorMessageMoneyToChange =
          'El monto ingresado es superior al saldo de la cuenta';
        return (this.isValueMoneyCorrect = false);
      }
      return (this.isValueMoneyCorrect = true);
    }, 2000);
  }

  changeToSoles(value: string) {
    const operacion = +value * this.compra;
    return Math.round(operacion);
  }

  changeToDollar(value: string) {
    const operacion = +value / this.venta;
    return Math.round(operacion);
  }

  updateMoneyTransactionToDollar() {
    const resultTransaction = this.changeToDollar(this.inputMoneytoChange);
    const newMoneyDollar =
      +this.AccountDollar.availableMoney + resultTransaction;
    const newMoneySoles =
      +this.AccountSoles.availableMoney - +this.inputMoneytoChange;

    const availableMoneyDollar = {
      availableMoney: newMoneyDollar.toString(),
    };

    const availableMoneySoles = {
      availableMoney: newMoneySoles.toString(),
    };

    this.bankService
      .updateCard(this.AccountDollar.accountNumber, availableMoneyDollar)
      .subscribe(
        (res) => {
          this.successChange.message =
            'Transacción exitosa, gracias por usar nuestro servicio';
          this.successChange.isSuccess = true;
          setTimeout(() => {
            this.successChange.isSuccess = false;
          }, 5000);
        },
        (err) => console.log(err)
      );

    this.bankService
      .updateCard(this.AccountSoles.accountNumber, availableMoneySoles)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  updateMoneyTransactionToSoles() {
    const resultTransaction = this.changeToSoles(this.inputMoneytoChange);
    const newMoneySoles = +this.AccountSoles.availableMoney + resultTransaction;
    const newMoneyDollar =
      +this.AccountDollar.availableMoney - +this.inputMoneytoChange;

    const availableMoneyDollar = {
      availableMoney: newMoneyDollar.toString(),
    };

    const availableMoneySoles = {
      availableMoney: newMoneySoles.toString(),
    };

    this.bankService
      .updateCard(this.AccountDollar.accountNumber, availableMoneyDollar)
      .subscribe(
        (res) => {
          this.successChange.message =
            'Cambio exitoso, en breve se visualizará el cambio en tu cuenta destino';
          this.successChange.isSuccess = true;
          setTimeout(() => {
            this.successChange.isSuccess = false;
          }, 5000);
        },
        (err) => console.log(err)
      );

    this.bankService
      .updateCard(this.AccountSoles.accountNumber, availableMoneySoles)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
  }

  handleEvent($event: any) {
    console.log($event);
    if ($event.left === 0) {
      console.log('termino');
      this.router.navigate(['']);
    }
  }
}