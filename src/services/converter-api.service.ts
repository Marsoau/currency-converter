import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { Currency } from "../model/currency";

@Injectable({
  providedIn: "root"
})
export class CurrencyAPI {
  private _baseUrl: string;

  public currencies: Currency[];

  public constructor(
    private readonly _http: HttpClient
  ) {
    this._baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

    this.currencies = [];

    this.GetCurrencies().then((currencies) => {
      this.currencies = currencies;
      console.log("currencies loaded");
      console.log(this.currencies);
    });
  }

  public async GetCurrencies() {
    let currenciesResponce = await this.Get<any>("currencies.min.json");
    let currencies: Currency[] = [];

    for (const [key, value] of Object.entries(currenciesResponce)) {
      currencies.push(new Currency(value as string, key));
    }

    return currencies;
  }

  public async GetCurrencyRates(currencyIso: string) {
    let rates = await this.Get<any>(`currencies/${currencyIso}.min.json`);

    return rates;
  }

  public async Convert(value: number, from: string, to: string) {
    let rates = await this.GetCurrencyRates(from);
    let rate = rates[from][to];

    return value * rate;
  }

  public async Get<T>(path: string) {
    return await lastValueFrom(
      this._http.get<T>(`${this._baseUrl}/${path}`)
    );
  }
}
