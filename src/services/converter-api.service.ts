import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { ICurrenciesResponce } from "../interfaces/currencies-responce";

@Injectable({
  providedIn: "root"
})
export class CurrencyAPI {
  private _baseUrl: string;

  public constructor(
    private readonly _http: HttpClient
  ) {
    this._baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
  }

  public async GetCurrencies() {
    let currencies = await this.Get<any>("currencies.min.json");

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
