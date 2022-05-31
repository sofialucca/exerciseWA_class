import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Container, Row, Alert } from 'react-bootstrap';
import { ExamRoute, DefaultRoute, LoginRoute } from './components/ExamViews';

import API from './API';

function App() {
  const [exams, setExams] = useState([]);
  const [message, setMessage] = useState('');
  const[loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (credentials) => {
    const user = await API.logIn(credentials);
    setMessage({msg : user.name, type: 'success'});
  }

  const getExams = async() => {
    const exams = await API.getAllExams();
    setExams(exams);
    // this message is not particularly useful here
    //setMessage({msg: 'Loading complete!', type: 'success'});
  };

  useEffect(() => {
    const checkAuth = async() =>  {
      await API.getUserInfo();
      setLoggedIn(true);
    }
    checkAuth()
  },[]); //when i referesh check if i have a valid session

  useEffect(() => {
    if(loggedIn)
      getExams();
  }, [loggedIn]);


  return (
    <Container className='App'>
      {message && <Row>
        <Alert variant={message.type} onClose={() => setMessage('')} dismissible>{message.msg}</Alert>
      </Row> }
      <BrowserRouter>
        <Routes>
          {/*if logged in we go straight to page home*/}
          <Route path = '/login' element = {loggedIn? <Navigate to = '/'/>: <LoginRoute login = {handleLogin}/>}/>
          {/*if not logged in we go straight to login home*/}
          <Route path='/' element={loggedIn ? <ExamRoute exams={exams} /> : <Navigate to = '/login'/>  }/>
          <Route path='*' element={ <DefaultRoute/> } />
        </Routes>
      </BrowserRouter>
    </Container>
    
  );
}

export default App;
