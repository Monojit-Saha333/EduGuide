import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { countries } from "../FormComponent/country";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Card, CarouselItem, Container, Modal } from "react-bootstrap";
import axios from "axios";

function Signup() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    Role: "",
  });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValue);
    try {
      const response = await axios({
        url: "https://localhost:44342/api/Account/AddUser",
        method: "POST",
        data: formValue,
      });
      console.log(response);
      alert(response?.data?.message);

      navigate("/login")
    } catch (err) {
     if(err.response==null)
        console.log('server Error');
    else if(err.response.status==409)
      console.log(err.message)
    }
  };
  const handleChangeUsername = (e) => {
    if (e.target.value.match("^[a-zA-Z0-9 ]*$") != null) {
      setFormValue({ ...formValue, username: e.target.value });
    }
  };
  const handleChangePassword = (e) => {
    if (e.target.value.match("^[a-zA-Z0-9]*$") != null) {
      setFormValue({ ...formValue, password: e.target.value });
    }
  };
  const handleChangeRole = (e) => {
    setFormValue({ ...formValue, Role: e.target.value });
  };
  return (
    <div className="Register">
      <Container>
      <Row>
      <Col></Col>
      <Col md={6} >
        <Card>
          <Card.Body>
            <h1>Sign up</h1>
            <Form onSubmit={handleSubmit}>
              {/* user name */}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column md="4">
                  Username <sup>*</sup>
                </Form.Label>
                <Col md="8">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={formValue.username}
                    required="on"
                    onChange={handleChangeUsername}
                  />
                </Col>
              </Form.Group>

              {/* password */}
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column md="4">
                  Password <sup>*</sup>
                </Form.Label>
                <Col md="8">
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    value={formValue.password}
                    required="on"
                    onChange={handleChangePassword}
                  />
                </Col>
              </Form.Group>
              {/* role */}
              <Form.Group as={Row}  className="mb-3" controlId="formPlaintextRole">
                <Form.Label column md={4}>
                  Role <sup>*</sup>
                </Form.Label>
                <Col md="8">
                <Form.Select
                  name="role"
                  id="role"
                  required="on"
                  aria-label="Open this select menu"
                  value={formValue.Role}
                  onChange={handleChangeRole}
                >
                  <option>Open this select menu</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
                </Col>
              </Form.Group>
              <Row>
                <Col>
                <Button
                className="float-right"
                size="md"
                variant="primary"
                type="submit"
                id="submit"
                style={{ float: "right" }}
              >
                Submit
              </Button>
              </Col>
              </Row>
             
            </Form>
          </Card.Body>
        </Card>
         </Col>
      <Col></Col>
      </Row>
      </Container>
    </div>
  );
}
export default Signup;