import { Room } from './room';
import { TypeOfTicket } from './typeOfTicket';

export class Ticket{
    'room': Room;
    'typeOfTicket': TypeOfTicket;
    
    constructor(data?: any){
        Object.assign(this,data);
    }
}