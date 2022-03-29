import {Injectable} from '@angular/core';
import {CountryToA2} from "../models/country-to-a2";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  public countries: any[];

  constructor() {
  }

  getCountries() {
    const keyArr: any[] = Object.keys(CountryToA2);
    const countries = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
      countries.push({value: key, code: CountryToA2[key]});
    });

    return countries;
  }

  sortCountries(countries) {
    this.countries = countries;
    this.countries.sort((a, b) => {
      if (a.name.common < b.name.common) {
        return -1;
      } else if (a.name.common > b.name.common) {
        return 1;
      } else {
        return 0;
      }
    });
    return this.countries;
  }
}
