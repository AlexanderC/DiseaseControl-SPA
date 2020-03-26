import React, { FunctionComponent, useEffect } from "react";
import { Confirmation } from "../components/confirmation";
import { BaseModal } from "../modals/BaseModal";
import { useModal } from "../shared/useModal";

type ConfirmationModalProps = {
  title: any;
  open: any;
  onAccept: any;
  onDismiss: any;
};

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (
  props
) => {
  const { isOpen, open, close } = useModal(false);

  const closeModal = () => {
    close();
    props.onDismiss();
  };

  const onAccept = async (tag: any) => {
    await props.onAccept(tag);
    close();
  };

  useEffect(() => {
    if (props.open) {
      open();
    } else {
      close();
    }
  }, [props.open, open, close]);

  return (
    <BaseModal isOpen={isOpen} close={closeModal} header={props.title}>
      <Confirmation onAccept={onAccept} onDecline={closeModal} />
    </BaseModal>
  );
};
