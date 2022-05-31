'use strict';
const crypto = require('crypto');
/* Data Access Object (DAO) module for accessing user */

const { db } = require('./db');


// verify the user
exports.getUser = (username,password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM user WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if(err)
        reject(err);
      else if(row === undefined){
        resolve(false);
      }else{
        const user = {id: row.id, username: row.email, name: row.name};

        crypto.scrypt(password,row.salt, 32, function(err,hashedPassword){
            if(err) reject(err);
            if(crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword))
                resolve(user);
            else resolve(false);
        })
      }
    });
  });
};