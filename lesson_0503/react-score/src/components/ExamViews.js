import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap';

import ExamTable from './ExamTable';
import ExamForm from './ExamForm';

import {Outlet} from 'react-router-dom';


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
            <ExamTable exams={props.exams} deleteExam={props.deleteExam}></ExamTable>
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
            <ExamForm addExam={props.addExam} exams = {props.exams} editExam = {props.editExam}></ExamForm>
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
  
function EditRoute(props){
    return(
    <Container className='App'>
      <Row>
        <Col>
          <h1>Update exam data</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {/*<Outlet/>*/ }
          <FormRoute addExam={props.addExam} editExam = {props.updateExam}/>
        </Col>
      </Row>
    </Container>); 
}

  export {ExamRoute,DefaultRoute,FormRoute,EditRoute};