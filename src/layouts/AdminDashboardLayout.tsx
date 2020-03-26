import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Container, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap";
import { useFormatMessage } from "../i18n/i18n.service";

const links = [
  {
    text: "tags",
    to: "/admin/tags",
  },
  {
    text: "inventory",
    to: "/admin/inventory",
  },
  {
    text: "hospitals",
    to: "/admin/hospitals",
  },
  {
    text: "users",
    to: "/admin/users",
  },
  {
    text: "supervisors",
    to: "/admin/supervisors",
  },
];

type NavLinkItemProps = {
  text: string;
  to: string;
};

const NavLinkItem: FunctionComponent<NavLinkItemProps> = (props) => {
  const i10n = useFormatMessage();
  return (
    <NavItem>
      <NavLink to={props.to} className="mx-2" activeClassName="font-weight-bold">
        {i10n(props.text as any)}
      </NavLink>
    </NavItem>
  );
};

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export const AdminDashboardLayout: FunctionComponent<AdminDashboardLayoutProps> = (props) => {
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
