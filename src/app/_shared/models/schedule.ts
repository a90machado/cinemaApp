;
import { ExibitionDay } from './exibitionDay';
import { Movie } from './movie';


export class Schedule{
    'exibitionDay': ExibitionDay;
    'sessionBegin': Movie;
    'sessionEnd': number;
    'structure': any;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}