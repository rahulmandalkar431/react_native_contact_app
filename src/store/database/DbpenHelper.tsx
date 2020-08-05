import SQLite, { SQLiteDatabase, SQLError } from 'react-native-sqlite-storage';

const openDatabaseCallback = () => {
    console.log("Database opened successfully");
}

const errorDatabaseCallback = (err: SQLError) => {
    console.log("Database failed to open Error: " + err.message);
}

const connection = SQLite.openDatabase({ name: "contacts.db", location: "default" }, openDatabaseCallback, errorDatabaseCallback);

class DbOpenHelper {

    getConnection(): SQLiteDatabase {
        return connection;
    }
}

export default new DbOpenHelper();
