import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value
    
    return null;
  }

}
