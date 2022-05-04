import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import dayjs from 'dayjs';
import ExamTable from './components/ExamTable';
import ExamForm from './components/ExamForm';
import { useState } from 'react';
import {BrowserRouter, Route,Routes} from 'react-router-dom';

const fakeExams = [
  {code: '01TYMOV', name: 'Information systems security', score: 30, date: dayjs('2022-02-01')},
  {code: '01SQJOV', name: 'Data Science and Database Technology', score: 21, date: dayjs('2021-06-15')},
  {code: '04GSPOV', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04')}
];

function App() {
  const [exams, setExams] = useState(fakeExams);

  const deleteExam = (courseCode) => {
    setExams((exs) => exs.filter(ex => ex.code !== courseCode));
  }

  const addExam = (exam) => {
    setExams(oldExams => [...oldExams, exam]);
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<ExamRoute exams = {exams} deleteExam={deleteExam} addExam={addExam}/> }>

          </Route>
          <Route path = "*" element = {<DefaultRoute/>}></Route>
          <Route path = '/add' element = {<FormRoute addExam={addExam}/>}></Route>      
      </Routes>

    </BrowserRouter>

  );
}

function ExamRoute(props){
  return (
    <Container className='App'>
      <Row>
        <Col>
          <h1>My Exams ({props.exams.length})</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExamTable exams={props.exams} deleteExam={props.deleteExam} addExam={props.addExam}></ExamTable>
        </Col>
      </Row>
    </Container>  
  )
}

function FormRoute(props){
  return(
    <Container className='App'>
      <Row>
        <Col>
          <h1>Enter exam data</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExamForm addExam={props.addExam}></ExamForm>
        </Col>
      </Row>
    </Container>      
  )
}

function DefaultRoute(){
  return(
    <div>
      <h1>No data here</h1>
      <h2>This is non the route you are loking for</h2>
    </div>
  )
}

export default App;
