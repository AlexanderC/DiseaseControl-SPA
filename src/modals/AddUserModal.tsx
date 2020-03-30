import React, { FunctionComponent, useRef } from "react";
import { useModal } from "../shared/useModal";
import { BaseModal } from "./BaseModal";
import { AddUserForm } from "../forms/AddUserForm";
import { useFormatMessage } from "../i18n/i18n.service";

type AddUserModalProps = {
  children: any;
  afterSubmit: () => any;
};

export const AddUserModal: FunctionComponent<AddUserModalProps> = (props) => {
  const { isOpen, open, close } = useModal(false);
  const initialData = useRef({ username: "", password: "", role: "" });

  const afterSubmit = () => {
    dismissModal();
    props.afterSubmit();
  };

  const dismissModal = () => {
    close();
  };
  const i10n = useFormatMessage();

  const Child = props.children;
  return (
    <>
      <Child openModal={open} />
      <BaseModal isOpen={isOpen} close={dismissModal} header={i10n("addUser")}>
        <AddUserForm value={initialData.current} afterSubmit={afterSubmit} onDismiss={dismissModal} />
      </BaseModal>
    </>
  );
};
