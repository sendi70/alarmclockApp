import React, { Component } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bobula_michal_4ic2.db')

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS test (id integer primary key not null, minutes text, seconds text, state text, days text);"
            );
        });
    }

    static add(min, sec, state, days) {

        var query = "INSERT INTO test (minutes, seconds, state, days) values ('" + min + "', '" + sec + "', '" + state + "', '" + days + "')"

        db.transaction(
            tx => {
                tx.executeSql(query);
            },
            (err) => alert(JSON.stringify(err))),
            () => alert("dodano")


    }

    static getAll() {
        var query = "SELECT * FROM test";
        //
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                //console.log(JSON.stringify(results))

                resolve(JSON.stringify(results));

            }, function (tx, error) {

                reject(error);

            });
        }))
    }

    static update(days, state, id) {
        var query = "UPDATE test SET days ='" + days + "', state = '" + state + "' WHERE id =" + id + ";"
        db.transaction(tx => {
            tx.executeSql(query);
        });
    }

    static remove(id) {
        var query = "DELETE FROM test WHERE (id = " + id + ");"
        db.transaction(tx => {
            tx.executeSql(query);
        });

    }

    static removeAll() {

        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM test ;"
            );
        });
    }

    static dropTable() {

        db.transaction(tx => {
            tx.executeSql(
                "DROP TABLE test ;"
            );
        });
    }



}

export default Database