import Exam from './Exam';

const SERVER_URL = 'http://localhost:3001';

const getAllExams = async () => {
  const response = await fetch(SERVER_URL + '/api/exams', {
    credentials: 'include'
  });
  const examsJson = await response.json();
  if(response.ok) {
    return examsJson.map(ex => new Exam(ex.code, ex.name, ex.credits, ex.date, (ex.laude ? ex.score + 'L' : ex.score)));
  }
  else
    throw examsJson;
};

const logIn = async(credentials) => {
  const response = await fetch(SERVER_URL + '/api/sessions',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if(response.ok){
    const user = response.json();
    return user;
  }else{
    const errDetails = await response.text();
    throw errDetails;
  }
}
const API = { getAllExams,logIn };
export default API;