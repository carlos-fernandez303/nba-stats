import "./NavComponent.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NavComponent = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        style={{
          borderBottom: "1px solid grey",

          backgroundColor: "#333",
        }}
      >
        <Container>
          <Navbar.Brand as="div">
            <Link to="/" className=" logo">
              🏀
              <span style={{ fontFamily: "Helvetica", fontWeight: "800" }}>
                NBA
              </span>{" "}
              Stats
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "white" }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ backgroundColor: "#333" }}
          >
            <Nav className="me-auto" style={{ paddingLeft: "4rem" }}>
              <Nav.Link eventKey="1" as="div">
                <Link to="players" className="nav-links">
                  Players
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="2" as="div">
                <Link to="teams" className="nav-links">
                  Teams
                </Link>
              </Nav.Link>
              <Nav.Link eventKey="3" as="div">
                <Link to="about" className="nav-links">
                  About
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavComponent;
