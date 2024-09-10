import { Component } from '@angular/core';
import { CurrencyAPI } from '../../services/converter-api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  usduah: string;
  euruah: string;

  constructor(
    readonly api: CurrencyAPI
  ) {
    this.usduah = "";
    this.euruah = "";

    this.loadValues();
  }

  private async loadValues() {
    var usduah = await this.api.Convert(1, "usd", "uah");
    var euruah = await this.api.Convert(1, "eur", "uah");

    this.usduah = usduah.toFixed(5);
    this.euruah = euruah.toFixed(5);
  }

  protected onTitleClick() {
    location.reload();
  }
}
