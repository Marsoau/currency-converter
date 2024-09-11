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
    protected readonly api: CurrencyAPI
  ) {
    this.currencySelectValue = "usd";
    this.amountInputValue = "1";
  }

  public get currency() {
    return this.currencySelectValue;
  }

  public set currency(currencyIso: string) {
    this.currencySelectValue = currencyIso;

    this.currencySelected.emit(this.currencySelectValue);
  }

  public get amount() {
    let amountNumber = parseFloat(this.amountInputValue);
    if (Number.isNaN(amountNumber)) {
      amountNumber = 0;
    }

    return amountNumber;
  }

  public async setAmount(value: number, fromCurrency: string, triggerEvent: boolean = true) {
    if (this.currency == fromCurrency) {
      this.amountInputValue = value.toFixed(5);
    }
    else {
      let convertedAmount = await this.api.Convert(value, fromCurrency, this.currencySelectValue);
      console.log(`converted amount: ${convertedAmount}`);
      this.amountInputValue = convertedAmount.toFixed(5);
    }

    if (triggerEvent) this.amountChanged.emit(this.amount);
  }

  protected async onCurrencySelect() {
    this.currencySelected.emit(this.currencySelectValue);
  }

  protected async onAmountInput() {
    this.amountChanged.emit(this.amount);
  }
}
