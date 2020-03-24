import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";

const links = [
  {
    text: "Tags",
    to: "/admin/tags",
  },
  {
    text: "Inventory",
    to: "/admin/inventory",
  },
  {
    text: "Hospitals",
    to: "/admin/hospitals",
  },
  {
    text: "Users",
    to: "/admin/users",
  },
  {
    text: "Supervisors",
    to: "/admin/supervisors",
  },
];

type NavLinkItemProps = {
  text: string;
  to: string;
};

const NavLinkItem: FunctionComponent<NavLinkItemProps> = (props) => {
  return (
    <NavItem>
      <NavLink
        to={props.to}
        className="mx-2"
        activeClassName="font-weight-bold"
      >
        {props.text}
      </NavLink>
    </NavItem>
  );
};

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const AdminDashboardLayout: FunctionComponent<AdminDashboardLayoutProps> = (
  props
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <section className="bg-light">
        <Container>
          <Navbar color="light" light expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                {links.map((link) => (
                  <NavLinkItem {...link} key={link.to} />
                ))}
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </section>
      <Container className="my-3">
        {props.title ? <h4>{props.title}</h4> : null}
        {props.children}
      </Container>
    </div>
  );
};
