import { Component, ElementRef, ViewChild } from '@angular/core';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { CurrencyAPI } from '../services/converter-api.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyInputComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild("firstInput", { read: ElementRef }) firstInput!: ElementRef;
  @ViewChild("secondInput") secondInput = new ElementRef<CurrencyInputComponent | null>(null);

  constructor(
    readonly api: CurrencyAPI
  ) {

  }

  protected updateInput(targetInput: CurrencyInputComponent, fromInput: CurrencyInputComponent) {
    if (fromInput.currency) {
      targetInput.setAmount(fromInput.amount, fromInput.currency, false);
    }
  }
}
