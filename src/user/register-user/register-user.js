import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

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

    const handleOnSubmit = () => {
        console.log(data);
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <Container>
                <Row>
                    <Col>
                        <label>Enter Username</label>
                        <input type="text" value={data.username} name="username" onChange={handleUpdateField} />
                    </Col>
                    <Col>
                        <label>Enter Password</label>
                        <input type="password" value={data.password} name="password" onChange={handleUpdateField} />
                    </Col>
                    <Col>
                        <label>Confirm Password</label>
                        <input type="password" value={data.confirmPassword} name="confirmPassword" onChange={handleUpdateField} />
                    </Col>
                    <Col>
                        <button type="submit">Register</button>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default RegisterUser;