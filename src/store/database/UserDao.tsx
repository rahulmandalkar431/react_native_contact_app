import Database from '../database/DbpenHelper';
import { User } from '../../dto/User';
import { SQLiteDatabase } from 'react-native-sqlite-storage';

class UserDao {

    private sql_createtable: string = "create table if not exists user(id TEXT PRIMARY KEY NOT NULL,name TEXT,contact TEXT,imageurl TEXT,dob NUMERIC)";

    private db: SQLiteDatabase;

    constructor() {
        this.db = Database.getConnection();
    }

    insertUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(this.sql_createtable, [], (t1, result) => {
                    let insertQuery = "insert into user (id,name,contact,dob,imageurl) values (?,?,?,?,?)";
                    t1.executeSql(insertQuery, [user.id, user.name, user.mobileNumber, user.dob, user.imageUrl], (t2, result1) => {
                        resolve();
                    }, (inserError) => {
                        reject(inserError);
                    })
                }, (createError) => {
                    reject(createError);
                })
            }, (transError) => {
                reject(transError);
            })
        })
    }

    getUser(userid: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(this.sql_createtable, [], (t1, result) => {
                    let selectQuery = `select * from user where id='${userid}' limit 1`;
                    t1.executeSql(selectQuery, [], (t2, result1) => {
                        if (result1.rows.length > 0) {
                            let item = result1.rows.item(0);
                            resolve(new User(item.id, item.name, item.imageurl, item.dob, item.contact));
                        } else {
                            reject(new Error('User not found'))
                        }
                    }, (inserError) => {
                        reject(inserError);
                    })
                }, (createError) => {
                    reject(createError);
                })
            }, (transError) => {
                reject(transError);
            })
        })
    }

    getAllUsers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(this.sql_createtable, [], (t1, result) => {
                    let selectQuery = `select * from user`;
                    t1.executeSql(selectQuery, [], (t2, result1) => {
                        let tempUsers: User[] = [];
                        for (let i = 0; i < result1.rows.length; i++) {
                            let item = result1.rows.item(i);
                            tempUsers.push(new User(item.id, item.name, item.imageurl, item.dob, item.contact));
                        }
                        resolve(tempUsers);
                    }, (selectError) => {
                        reject(selectError);
                    })
                }, (createError) => {
                    reject(createError);
                })
            }, (transError) => {
                reject(transError);
            })
        })
    }

    updateUser(userid: string, user: User): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(this.sql_createtable, [], (t1, result) => {
                    let updateQuery = `update user set name='${user.name}',
                    contact='${user.mobileNumber}',
                    dob='${user.dob}',
                    imageurl='${user.imageUrl}' where id='${userid}'`;
                    t1.executeSql(updateQuery, [], (t2, result1) => {
                        resolve(true);
                    }, (updateError) => {
                        reject(updateError);
                    })
                }, (createError) => {
                    reject(createError);
                })
            }, (transError) => {
                reject(transError);
            })
        })
    }
}

export default UserDao;