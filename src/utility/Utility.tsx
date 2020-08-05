import moment from 'moment';
import { v4 as uuid } from 'uuid';

class Utility {

    static getDateObjectFromString(date: string): Date {
        return new Date(date);
    }

    static getFormattedDate(date: Date): string {
        return moment(date).format("YYYY-MM-DD");
    }

    static getFormattedDateForUserItem(date: Date): string {
        return moment(date).format('MMM DD,YYYY');
    }

    static getNewUid(): string {
        return uuid();
    }


}

export default Utility;