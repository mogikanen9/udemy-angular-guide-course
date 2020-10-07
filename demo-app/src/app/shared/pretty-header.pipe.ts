import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyHeader'
})
export class PrettyHeaderPipe implements PipeTransform {

  transform(value: string, maxl: number): unknown {
    if (value && value.length > 0 && value.length > maxl) {
      return value.substr(0, maxl).concat('...').toUpperCase();
    }
    return value;
  }

}
