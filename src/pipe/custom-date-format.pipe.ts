import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat',
  standalone: true,
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }
}
