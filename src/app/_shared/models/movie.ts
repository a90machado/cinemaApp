export class Movie{
    'title': string;
    'image': string;
    'minimumAge': number;
    'duration': number;
    'releaseDate': Date;
    'endDate': Date;
    'director': string;
    'cast': string;
    'synopsis': string;
    constructor(data?: any){
        Object.assign(this,data);
    }
}