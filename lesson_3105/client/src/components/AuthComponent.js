import {useState} from "react";
import {Form, Row, Button, Col} from 'react-bootstrap';

function LoginForm(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {username, password};
        props.login(credentials);
    }

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId = 'username'>
                <Form.Label>email</Form.Label>
                <Form.Control type = 'email' value = {username} onChange = {ev => setUsername(ev.target.value)} required = {true}/>
            </Form.Group>

            <Form.Group controlId = 'password'>
                <Form.Label>password</Form.Label>
                <Form.Control type = 'password' value = {password} onChange = {ev => setPassword(ev.target.value)} required = {true} minLength = {6}/>
            </Form.Group>

            <Button type = "submit">Submit</Button>            
        </Form>
    )
}

export default LoginForm;