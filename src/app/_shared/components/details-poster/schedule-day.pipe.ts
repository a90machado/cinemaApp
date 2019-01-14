import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleDay'
})
export class ScheduleDayPipe implements PipeTransform {

  transform(schedules: any[], exibitionDay: any): any {

    var result = []
    if (schedules !== null) {
      for (let schedule of schedules) {

        if (schedule.exibitionDayDTO.id == exibitionDay.id) {
          result.push(schedule);
        }

      }
    }
    return result;
  }
}
