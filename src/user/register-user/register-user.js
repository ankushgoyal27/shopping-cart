import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";

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

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, data.username, data.password);
            const user = res.user;

            const adminRef = doc(db, "users", user.uid);
            await setDoc(adminRef, {
                uid: user.uid,
                authProvider: "local",
                email: data.username,
                stores: []
            });
        } catch (err) {
            console.error(err);
            alert(err.message);
        } console.log(data);
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
                <Row>
                    <Col>
                        <Link to="signin">Already a member? Sign in now</Link>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default RegisterUser;