/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Mail } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, FormGroup, FormControl } from "react-bootstrap";
import Amplify, { Auth } from "aws-amplify";
import { setUser } from "../actions/auth.action";
import { signUpErrors } from "../library/errors.library";
import { get } from "lodash";

export default function RegisterPage() {
  let history = useHistory();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  const register = async () => {
    try {
      setError(null);
      setIsSubmitting(true);

      if (!isValidPassword(password)) {
        setError("Password does not match the requirements");
      } else {
        await Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
          },
        });

        await Auth.signIn(email, password);

        history.push("/code");
      }
    } catch (error) {
      setError(
        get(
          signUpErrors.find(({ code }) => code === error.code),
          "message",
          "An error occurred signing up"
        )
      );
      setIsSubmitting(false);
    }
  };

  const isValidPassword = (value) => {
    return RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
    ).test(value);
  };

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  const policyStyle = {
    textDecoration: "underline",
  };

  return (
    <div id="RegisterPage">
      <div>
        <div className="row justify-content-center index-container">
          <div className="text-need col-md-5 col-xl-4">
            <p className="text-center">Need to return or donate</p>
            <p className="text-center">purchases made in the past?</p>
            <p className="text-center">Let's go!</p>
            <div
              className="form-group"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => Auth.federatedSignIn({ provider: "Google" })}
                className="btn btn-md btn-block btn-google"
                style={{
                  background: "white",
                  boxShadow: "0px 0px 4px 0.5px rgba(0,0,0,0.1)",
                  color: "#690098",
                  fontWeight: "normal",
                  fontSize: "16px",
                  paddingTop: "10px",
                }}
              >
                <div className="avatar avatar-xs mr-2">
                  <img
                    className="avatar-img"
                    src="https://i.pinimg.com/originals/39/21/6d/39216d73519bca962bd4a01f3e8f4a4b.png"
                  />
                </div>
                Join with Google
              </button>
            </div>
            <div>
              <p className="line-break">
                <span>or</span>
              </p>
            </div>
            <Form>
              {error && (
                <div className="alert alert-danger" role="alert">
                  <h4 className="text-center text-alert">{error}</h4>
                </div>
              )}
              <Form.Group>
                <Form.Control
                  className="form-control form-control-lg"
                  type="email"
                  name="email"
                  placeholder="Your email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Your password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <button
                className="btn btn-lg btn-block btn-green mb-3 btn-submit"
                type="submit"
                disabled={
                  isSubmitting || email.length === 0 || password.length === 0
                }
                onClick={register}
              >
                <i className="fe fe-mail">
                  <Mail />
                </i>
                Join with email
              </button>
            </Form>
            <div className="text-left">
              <small className="text-muted text-left">
                By joining noted you agree to our{" "}
                <a
                  href="https://www.notedreturns.com/terms-and-conditions"
                  style={policyStyle}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="https://www.notedreturns.com/privacy-policy"
                  style={policyStyle}
                >
                  Privacy
                </a>
                . Protected by Google's{" "}
                <a
                  href="https://policies.google.com/privacy"
                  style={policyStyle}
                >
                  Privacy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" style={policyStyle}>
                  Terms
                </a>
                .
              </small>
            </div>
            <h3 className="text-already">
              Already a member?{" "}
              <Link to="login" className="text-decoration-underline text-login">
                {" "}
                Log in
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
