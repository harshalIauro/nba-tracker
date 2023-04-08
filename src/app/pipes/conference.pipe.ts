import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conference'
})
export class ConferencePipe implements PipeTransform {

  /**
   * @param value : string
   * @description To transform the conference of the team. If we have ease simply transfer  Eastern conference else 
   * conference will be Western.
   */
  transform(value: string): string {
    if (value.toLocaleLowerCase() === 'east') {
      return 'Eastern conference'
    } else {
      return 'Western conference'
    }
  }
}
