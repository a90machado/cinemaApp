import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'schedule'
})
export class SchedulePipe implements PipeTransform {

  transform(exibitionDays: any[], offset : number): any {
    var dateNow = new Date(Date.now());
    var currentDay = dateNow.getUTCDate();
    var currentMonth = dateNow.getMonth()+1;
    var currentYear = dateNow.getFullYear();
    var dataExibicao;

    var result = []
    for (let date of exibitionDays) {
      dataExibicao = new Date(date.exibitionDayDTO.day, date.exibitionDayDTO.month, date.exibitionDayDTO.year);
      if (date.exibitionDayDTO.day==currentDay+offset&& date.exibitionDayDTO.month==currentMonth && date.exibitionDayDTO.year==currentYear)
        result.push(date);
    }
    return result;
  }
}