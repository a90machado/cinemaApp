import { Cinema } from './cinema';
import { Movie } from './movie';

export class Room{
    'cinema': Cinema;
    'movie': Movie;
    'numberOfQueues': number;
    'numberOfSeatsPerQueue': number;
    
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}