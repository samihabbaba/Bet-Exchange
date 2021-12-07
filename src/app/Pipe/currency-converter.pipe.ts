import { Pipe, PipeTransform } from '@angular/core';
import { SharedFunctionsService } from '../services/shared-functions.service';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  constructor(private sharedService:SharedFunctionsService) {

  }
  
  transform(value: number | string, ...args: unknown[]): unknown {
    // return value
    return ((+value) * this.sharedService.currencyData.rate).toFixed(2)
    
    return null;
  }

}
