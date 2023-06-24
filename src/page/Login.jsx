import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault()
        const data = {
            "email": form.email,
            "password": form.password
        }
        try {
            setLoading(true)
            const result = await fetch(`${import.meta.env.VITE_ENDPOINT}/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const res = await result.json();
            if (res.token) {
                localStorage.setItem('token', res.token);
                setLoading(false)
                return navigate('/dashboard')
            } else {
                setLoading(false)
                return swal("Gagal", `${res.message}`, "warning");
            }
        } catch (e) {
            setLoading(false)
            return swal("Gagal", `Terjadi Kesalahan`, "error");
        }
    }
    const token = localStorage.getItem('token');
    if (token) {
        return (
            <>
                <p>Anda Sudah Login, Silahkan Masuk Menu Dashboard <Link to={'/dashboard'}>disini</Link> </p>
            </>
        )
    } else {
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card className='card-login dashboard-admin' style={{ borderTop: '3px solid blue', minWidth: 350 }}>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <hr />
                        <Form onSubmit={handleLogin} className="login-form">
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={(e) => setForm({
                                        ...form,
                                        email: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({
                                        ...form,
                                        password: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>
                            {
                                loading ?
                                    <Button className='mt-3 button-login' variant="button" type="submit" disabled>
                                        Loading...
                                    </Button> :
                                    <Button className='mt-3 button-login' variant="primary" type="submit">
                                        Login
                                    </Button>
                            }
                        </Form>

                        <div className='mt-3' style={{ lineHeight: 2 }}>
                            <b className='mb-1'>Catatan</b>
                            <p>
                                Sudah menggunakan JWT
                            </p>
                            <b className='mb-1'>Akun</b>
                            <p>
                                email: <b>admin@admin.com</b>
                                <br />
                                password: <b>admin</b>
                            </p>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
        );
    }

};

export default Login;