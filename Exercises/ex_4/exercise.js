"use strict";

const dayjs = require("dayjs");
const sqlite = require("sqlite3");

function Exam(code, name, credits, date, score, laude = false) {
  this.code = code;
  this.name = name;
  this.credits = credits;
  this.date = date;
  this.score = score;
  this.laude = laude;

  this.toString = () =>
    `${this.code} - ${this.name}: ${laude ? this.score + "L" : this.score}`;
}

function ExamList() {
  const db = new sqlite.Database("exams.sqlite", (err) => {
    if (err) throw err;
  });

  // add
  this.add = (exam) => {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO score(coursecode, score, laude, datepassed) VALUES(?, ?, ?, DATE(?))";
      //date must be in the format of the database object type data
      db.run(
        sql,
        [exam.code, exam.score, exam.laude, exam.date.format("YYYY-MM-DD")],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  };

  // getAll
  this.getAll = () => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM course Join score ON course.code = score.coursecode";

      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          if(rows.length === 0){
            resolve('No exams found in the DB');
          }else{
            const exams = rows.map(
              (row) =>
                new Exam(
                  row.code,
                  row.name,
                  row.CFU,
                  row.datepassed,
                  row.score,
                  row.laude ? true : false
                )
            );
            resolve(exams);            
          }

        }
      });
    });
  };

  // find
  this.find = (courseCode) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM course Join score ON course.code = score.coursecode WHERE course.code = ?";

      db.get(sql, [courseCode], (err, row) => {
        if (err) reject(err);
        else {
          if(row !== undefined){
            const exam = new Exam(
              row.code,
              row.name,
              row.CFU,
              row.datepassed,
              row.score,
              row.laude ? true : false
            );
            resolve(exam);
          }else{
            resolve("No exam found with code " + courseCode);
          }

        }
      });
    });
  };

  // afterDate
  this.afterDate = (date) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM course Join score ON course.code = score.coursecode WHERE datepassed > ?";

      db.all(sql, [date.format('YYYY-MM-DD')], (err, rows) => {
        if (err) reject(err);
        else {
          if(rows.length === 0){
            resolve('No exams after '+ date.format('DD-MM-YYYY'));
          }else{
            const exams = rows.map(
              (row) =>
                new Exam(
                  row.code,
                  row.name,
                  row.CFU,
                  row.datepassed,
                  row.score,
                  row.laude ? true : false
                )
            );
            resolve(exams);            
          }

        }
      });
    });
  };

  //getWorst
  this.getWorst = (num) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM course Join score ON course.code = score.coursecode ORDER BY score ASC";

      db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else {
          if(rows.length === 0){
             resolve('No passed exams in the database');
          }else{
            if(num === 0){
              resolve('No exams because number inserted is 0');
            }else{
              const exams = rows.filter((row,index)=>index<num).map(
                (row,index) =>
                  new Exam(
                    row.code,
                    row.name,
                    row.CFU,
                    row.datepassed,
                    row.score,
                    row.laude ? true : false
                  )
              );
              resolve(exams);                   
            } 
          }           
        }

      });
    });
  };
}

/* TESTING */
async function main() {
  const wa1 = new Exam(
    "01TXYOV",
    "Web Application I",
    6,
    dayjs("2022-06-07"),
    30,
    true
  );
  const softeng = new Exam(
    "04GSPOV",
    "Software Engineering I",
    6,
    dayjs("2022-07-02"),
    28
  );

  const examsDb = new ExamList();
  /*const id = await examsDb.add(wa1);
  console.log(id);*/

  const myExams = await examsDb.getAll();
  console.log(myExams.toString());

  const courseCode = "01TYMOV";
  const myExam = await examsDb.find(courseCode);
  console.log(myExam.toString());

  const date = dayjs('2022-08-09');
  const examDate = await examsDb.afterDate(date);
  console.log(examDate.toString());

  const num = '';
  const worstExam = await examsDb.getWorst(num);
  console.log(worstExam.toString());
}

main();
