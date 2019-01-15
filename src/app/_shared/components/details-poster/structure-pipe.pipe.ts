import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'structurePipe',
  pure: true
})
export class StructurePipePipe implements PipeTransform {

  transform(rooms: any[], roomId: number, offSet: number): any {

    var result;
    var res = [];

    if (rooms !== null) {
      if (offSet == 1) {
        for (let room of rooms) {
          if (room.id == roomId) {
            result = room.numberOfQueues;
          }
        }
      }

      if (offSet == 2) {
        for (let room of rooms) {
          if (room.id == roomId) {
            result = room.numberOfSeatsPerQueue;
          }
        }
      }

      for (let index = 0; index < result; index++) {
        res.push(index);
      }

      return res;
    }
    else
      return rooms;
  }
}
