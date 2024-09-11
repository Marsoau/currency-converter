import { Component } from '@angular/core';
import { CurrencyInputComponent } from './currency-input/currency-input.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CurrencyInputComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected updateInput(targetInput: CurrencyInputComponent, fromInput: CurrencyInputComponent) {
    if (fromInput.currency) {
      targetInput.setAmount(fromInput.amount, fromInput.currency, false);
    }
  }
}
