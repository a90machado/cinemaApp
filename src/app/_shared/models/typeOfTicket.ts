import { Cinema } from './cinema';

export class TypeOfTicket{
    'id':number;
    'typeOfTicket': string;
    'priceOfTicket': number;
    'cinema': Cinema;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}