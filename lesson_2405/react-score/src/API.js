import Exam from './Exam';
const SERVER_URL = "http://localhost:3001";
const getAllExams = async () => {
  const response = await fetch(SERVER_URL + '/api/exams');
  const examsJson = await response.json();
  if(response.ok) {
    return examsJson.map(ex => new Exam(ex.code, ex.name, ex.credits, ex.date, (ex.laude ? ex.score + 'L' : ex.score)));
  }
  else
    throw examsJson;
};

const addExam = async(exam) => {
  
  if(exam.score === 31){
    exam.score = 30;
    exam.laude = true;
  }
  else exam.laude = false;

  const response = await fetch(SERVER_URL + '/api/exams',
    {   
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify( // will stringify also dayjs object with the timestamp unless we user format conversion
        {
          code:exam.code,
          score:exam.score,
          laude:exam.laude,
          date:exam.date.format('YYYY-MM-DD')
        }
      )
    }
  );

  if(!response.ok){
      const errMessage = await response.json();
      console.log(errMessage);
      throw errMessage;    
  }else{
    return null;
  }

  //add other error handling
}

const deleteExam = async(courseCode) => {
  try{
    const response = await fetch(SERVER_URL + '/api/exams/' + courseCode,
      {
        method: 'DELETE'
      }
    );
    if(!response.ok){
      const errMessage = await response.json();
      throw errMessage;    
    }else{
      return null;
    }
  }catch(err){
    throw new Error("Can't communicate with server");
  }

}
const API = {getAllExams, addExam,deleteExam};
export default API;