import { Component, EventEmitter, Output } from '@angular/core';
import { CurrencyAPI } from '../../services/converter-api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-currency-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-input.component.html',
  styleUrl: './currency-input.component.scss'
})
export class CurrencyInputComponent {
  protected currencySelectValue: string;
  protected amountInputValue: string;

  @Output() public currencySelected = new EventEmitter<string>();
  @Output() public amountChanged = new EventEmitter<number>();

  constructor(
    public readonly api: CurrencyAPI
  ) {
    this.currencySelectValue = "usd";
    this.amountInputValue = "1.00000";
  }

  public get currency() {
    return this.currencySelectValue;
  }
  public get amount() {
    let valueNumber = parseInt(this.amountInputValue);
    if (Number.isNaN(valueNumber)) {
      valueNumber = 0;
    }

    return valueNumber;
  }

  public setCurrency(currencyIso: string) {
    this.currencySelectValue = currencyIso;

    this.currencySelected.emit(this.currencySelectValue);
  }

  public async setAmount(value: number, fromCurrency: string, triggerUpdateEvent: boolean = true) {
    if (this.currency == fromCurrency) {
      this.amountInputValue = value.toFixed(5);
    }
    else {
      let convertedAmount = await this.api.Convert(value, fromCurrency, this.currencySelectValue);
      console.log(`converted amount: ${convertedAmount}`);
      this.amountInputValue = convertedAmount.toFixed(5);
    }

    if (triggerUpdateEvent) this.amountChanged.emit(this.amount);
  }

  protected async onCurrencySelect() {
    console.log("c input");
    this.currencySelected.emit(this.currencySelectValue);
  }
  protected async onAmountInput() {
    console.log("amount input");
    this.amountChanged.emit(this.amount);
  }
}
