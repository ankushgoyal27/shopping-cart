import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { registerWithEmailAndPassword } from "../../firebaseConfig";

const RegisterUser = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleUpdateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = e => {
        registerWithEmailAndPassword(data.username, data.username, data.password)
        console.log(data);
        e.preventDefault();
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Container>
                <Row>
                    <Col>
                        <label>Enter Username</label>
                        <input type="text" value={data.username} name="username" onChange={handleUpdateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Enter Password</label>
                        <input type="password" value={data.password} name="password" onChange={handleUpdateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Confirm Password</label>
                        <input type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleUpdateField} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="submit">Register</button>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default RegisterUser;