'use strict';

const dayjs = require("dayjs"); // to install a library


function Exam(code, name, credits, date,score, laude = false){
   this.code = code;
   this.name = name;
   this.credits = credits;
   this.date = date;
   this.score = score;
   this.laude = laude; 
}

function ExamList(){
    this.list = [];
    //ADD
    this.add = (Exam) => {
        this.list.push(Exam);
    };

    //find
    this.find = (code) => {
        /*
        for(const c of this.list){
            if(c.code === code){
                return c;
            }
        }

        return undefined;
        */
       return this.list.filter(course => course.code === code)[0]; // to obtaim the first element of the array returned
    };

    //afterDate

    this.afterDate = (date) => {
        return this.list.filter(course => course.date.isAfter(date));
    }

    //listByDate --> we don't want to change the order of original list but only obtain a copy of original one
    this.listByDate = () =>{
        return [...this.list].sort((a,b) => (a.date.isAfter(b.date)? 1 : -1));
    };

    //listByScore
    this.listByScore = () =>{
        return [...this.list].sort((a,b) => b.score - a.score);//pagliaccia
    }


    //average

    this.average = () => {
        return this.list.reduce((sum, course) => sum + course.score, 0)/this.list.length;
    }

}

const wa1 = new Exam('01abc', 'Web Application 1', 6, dayjs('2022-06-07'), 30, true);
const softeng = new Exam('01xxx', 'Software Engineering 1', 8, dayjs('2022-07-02'), 28);

const exams = new ExamList();

exams.add(wa1);
exams.add(softeng);

console.log(exams.find('01abc'));
console.log(exams);
console.log(exams.listByDate());