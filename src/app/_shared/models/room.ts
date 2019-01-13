import { Cinema } from './cinema';
import { Movie } from './movie';

export class Room{
    'cinema': Cinema;
    'movie': Movie;
    'totalSeats':number;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}