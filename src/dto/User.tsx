export class User {

    id:string;
    name:string;
    imageUrl:string;
    dob:string;
    mobileNumber:string;

    constructor(id:string,name:string,imageUrl:string,dob:string,mobileNumber:string){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.dob = dob;
        this.mobileNumber = mobileNumber;
    }

}