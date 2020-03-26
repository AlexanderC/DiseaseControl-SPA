import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";
import { useFormatMessage, useI18n } from "../i18n/i18n.service";
import logo from "../resources/img/logo.png";
import { wsCloseAll } from "../services/Websocket";

export function Header() {
  const history = useHistory();
  const i18n = useI18n();
  const l10n = useFormatMessage();
  const isLoggedIn = localStorage.getItem("currentUser") !== "";
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/" className="mr-auto">
          <img src={logo} height="30" className="d-inline-block align-top mr-2" alt="Logo" />
          Disease Control
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {/* push to right other elements */}
          <div className="mr-auto" />
          {isLoggedIn && (
            <Button
              color="link"
              onClick={() => {
                wsCloseAll();
                localStorage.setItem("currentUser", "");
                history.push("/login");
              }}
            >
              {l10n("logout")}
            </Button>
          )}
          <UncontrolledDropdown>
            <DropdownToggle nav caret>
              {l10n("language")}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => i18n.changeLanguage("ro")}>{l10n("language.romanian")}</DropdownItem>
              <DropdownItem onClick={() => i18n.changeLanguage("ru")}>{l10n("language.russian")}</DropdownItem>
              <DropdownItem onClick={() => i18n.changeLanguage("en")}>{l10n("language.english")}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Container>
    </Navbar>
  );
}
