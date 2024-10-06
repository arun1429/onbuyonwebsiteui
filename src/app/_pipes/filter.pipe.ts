import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, minPrice: Number, maxPrice: Number): any {
    if (items && items.length) {
      return items.filter(
        item => {
          if (item.offerPrice > maxPrice) {
            return false;
          }
          if (item.offerPrice < minPrice) {
            return false;
          }
          return true;
        }
      );
    } else {
      return items;
    }
  }

}
