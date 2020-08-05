import moment from 'moment';
import { v4 as uuid } from 'uuid';

class Utility {

    static getFormattedDate(date: Date): string {
        let newDt = moment(date,"YYYY-MM-DD")
        return moment(newDt).format("YYYY-MM-DD");
    }

    static getFormattedDateForUserItem(date: string): string {
       // let newDt = moment(date,"YYYY-MM-DD")
        return moment(date).format('MMM DD,YYYY');
    }

    static getNewUid(): string {
        return uuid();
    }

    
}

export default Utility;