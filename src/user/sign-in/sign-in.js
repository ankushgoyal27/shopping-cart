import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const [data, setData] = useState({
        username: '',
        password: '',
    });
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/cart')
    }, [navigate, user]);


    const handleUpdateField = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDoc = await signInWithEmailAndPassword(auth, data.username, data.password);
            console.log(userDoc);
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
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
                        <button type="submit">Sign In</button>
                    </Col>
                </Row>
            </Container>
        </form>
    )
}

export default SignIn;