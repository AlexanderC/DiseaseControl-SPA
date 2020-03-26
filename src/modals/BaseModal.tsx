import React, { FunctionComponent } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

type BaseModalTypes = {
  className?: string;
  isOpen: boolean;
  close: any;
  header: any;
};

export const BaseModal: FunctionComponent<BaseModalTypes> = (props) => {
  const { className, isOpen, close, header } = props;

  return (
    <Modal isOpen={isOpen} toggle={close} className={className}>
      <ModalHeader toggle={close}>{header}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
    </Modal>
  );
};
