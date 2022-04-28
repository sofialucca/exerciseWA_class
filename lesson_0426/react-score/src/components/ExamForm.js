import {Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import dayjs from 'dayjs';

function ExamForm(props) {
  const [code, setCode] = useState(props.exam? props.exam.code : '');
  const [course, setCourse] = useState(props.exam? props.exam.name: '');
  const [score, setScore] = useState(props.exam? props.exam.score: 30);
  const [date, setDate] = useState(props.exam? props.exam.date.format('YYYY-MM-DD'): dayjs().format('YYYY-MM-DD'));

  const handelSubmit = (event) => {
      event.preventDefault();
      const exam = {code: code, name:course, score: score, date: dayjs(date)};
      //VALIDATION
      if(props.exam === undefined)
        props.addExam(exam);
      else
        props.editExam(exam);
  }

  return(
    //if we use onClick we loose html validation, better have onSubmit
    <Form onSubmit = {handelSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Course Code</Form.Label>
        <Form.Control type="text" value={code} required = {true} minLength = {5} maxLength = {7} onChange={event => setCode(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Course Name</Form.Label>
        <Form.Control type="text" value={course} required = {true} onChange={event => setCourse(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Score</Form.Label>
        <Form.Control type="number" value={score} min = {18} max = {31} onChange={event => setScore(event.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={event => setDate(event.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit">Save</Button> <Button variant = "danger" onClick = {props.cancel}>Cancel</Button>
      
    </Form>
  )
}

export default ExamForm;