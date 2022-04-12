'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database('data.sqlite',
    (err) => { if (err) throw err; });

for(let i=0; i<100; i++) {
    //both asynchronous st operations performed when there is time
    db.run('insert into numbers(number) values(1)', (err) => { if (err) throw err; });
    // look at queries_sync.js for solution
    //we should nest callbacks, but not convenient with respect to writing it
        //-->callback hell
    db.all('select count(*) as tot from numbers',
    (err, rows) => {
        if(err) throw err;
        console.log(rows[0].tot);
    }) ;
}
db.close();

