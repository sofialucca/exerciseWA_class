import {Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';
import {Link, useNavigate,useParams, useLocation} from 'react-router-dom';

function ExamForm(props) {
  
  const navigate = useNavigate();
  const {examCode} = useParams();
/*
  const editableExam = examCode && props.exams.find(ex => ex.code === examCode);

  const [code, setCode] = useState(editableExam ? editableExam.code : '');
  const [course, setCourse] = useState(editableExam ? editableExam.name : '');
  const [score, setScore] = useState(editableExam ? editableExam.score : 30);
  const [date, setDate] = useState(editableExam ? editableExam.date : dayjs());
*/
  const location = useLocation();  
    
  // If the exam already exists we configure the form, otherwise we use default values.
  const [code, setCode] = useState(location.state ? location.state.exam.code : '');
  const [course, setCourse] = useState(location.state ? location.state.exam.name : '');
  const [score, setScore] = useState(location.state ? location.state.exam.score : 30);
  const [date, setDate] = useState(location.state ? dayjs(location.state.examDate) : dayjs());

  // If location.state is not defined we will add a new film.
  const isAdding = location.state ? false : true;
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const exam = {code: code, name: course, score: score, date: dayjs(date)};
    // VALIDATION!
    //if(editableExam === undefined)
    if(isAdding)
      props.addExam(exam);
    else
      props.editExam(exam);

    navigate ('/');
  }
  
  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Course Code</Form.Label>
        <Form.Control type="text" required={true} minLength={5} maxLength={7} value={code} onChange={event => setCode(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Course Name</Form.Label>
        <Form.Control type="text" required={true} value={course} onChange={event => setCourse(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Score</Form.Label>
        <Form.Control type="number" min={18} max={31} value={score} onChange={event => setScore(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        
        <Form.Control type="date" value={date.format('yyyy-mm-dd')} onChange={event => setDate(dayjs(event.target.value))}/>
      </Form.Group>

      <Button variant="primary" type="submit">Save</Button>
      &nbsp; 
      <Link  to = '/'>
        <Button variant = "danger" onClick = {props.cancel}>Cancel</Button>
      </Link>

    </Form>
  )
}

export default ExamForm;