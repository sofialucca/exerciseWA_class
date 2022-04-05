
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container,Row,Col} from 'react-bootstrap'
import {ExamScores} from './components/ExamComponents.js';
import dayjs from 'dayjs';

const fakeExams = [
  {code: '01TYM0V', name: 'Information systems security', score: 30, date: dayjs('2022-02-01')},
  {code: '01SQJ0V', name: 'Data Science and database technology', score: 21, date: dayjs('2022-06-05')},
  {code: '04GSP0V', name: 'Software Engineering', score: 26, date: dayjs('2022-06-04')}
]
function App() {
  return (
    <Container>
      <Row>
        <Col>
          <h1>My Exams</h1>
        </Col>
      </Row>
      <Row>
        <ExamScores exams = {fakeExams}>

        </ExamScores>
      </Row>
    </Container>
  );
}

export default App;
