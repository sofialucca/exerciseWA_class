import 'bootstrap/dist/css/bootstrap.min.css';
import {Col,Table,Button} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ExamScores(props){
    return (
        <Col>
            <ExamTable exams = {props.exams}>

            </ExamTable>
        </Col>
    );
}

function ExamTable(props) {
    return(
        <Table striped>
            <thead>
                <tr>
                    <th>Exam</th>
                    <th>Score</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.exams.map((ex) => <ExamRow exam = {ex} key = {ex.code}/>)
                }
            </tbody>
        </Table>
    );
}

function ExamRow(props){
    return(
        <tr><ExamData exam = {props.exam}/><ExamActions /></tr>
    );
}

function ExamData(props){
    return(
        <>
            <td>{props.exam.name}</td>
            <td>{props.exam.score}</td>
            <td>{props.exam.date.format('YYYY-MM-DD')}</td>            
        </>
    );
}

function ExamActions(){
    return <td><Button variant = 'danger'>
    <i className = 'bi bi-trash'></i></Button></td>
}

export {ExamScores};