import { Room } from './room';


export class ExibitionDay{

    'room':Room;
    'day':number;
    'month':number;
    'year':number;
    'dayOfWeek':string;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}