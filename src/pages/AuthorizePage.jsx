import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import AuthorizeImg from "../static/img/Authorize.svg";

export default function AuthorizePage() {
  return (
    <div id="Authorize">
      <Container className="main-body mt-n5">
        <Row className="text-left align-items-end">
          <Col xs="6" className="info">
            <h1 className="bold text-title">Everything is automatic</h1>
            <h4 className="text-noted">
              Noted will scan your email inbox and find all of your online
              purchases and their return limits.
            </h4>
            <div className="text-subtitle">
              <h4 className="bold">In time?</h4>
              <h4>Get your cash back with one click</h4>
            </div>
            <div className="text-subtitle">
              <h4 className="bold">Too late?</h4>
              <h4>Declutter your home and donate to local charities</h4>
            </div>

            <h4 className="text-first">
              You first need to authorized Noted to read your emails. Only bots
              will see the relevant emails and we will never sell or transfer
              any of your personal info to anyone.
            </h4>
            <h4 className="text-underline">
              <a href="#">Learn more about security</a>
            </h4>
            <Link to="/dashboard">
              <Button className="btn btn-success btn-authorize">
                Authorize Noted
              </Button>
            </Link>
          </Col>
          <Col xs="6">
            <div className="authorize-img">
              <img src={AuthorizeImg} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
