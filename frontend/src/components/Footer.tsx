import * as React from 'react';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

class MyFooter extends React.Component<{}> {
  render() {
    return (
      <footer className="py-5">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              2020{' '}
              <a
                className="font-weight-bold ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                A-Team
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://it.wikipedia.org/wiki/A-Team"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  A-Team
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://it.wikipedia.org/wiki/A-Team"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  About Us
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://it.wikipedia.org/wiki/A-Team"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Blog
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT License
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default MyFooter;
