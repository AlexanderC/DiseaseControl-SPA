import React, { FunctionComponent } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const TagForm: FunctionComponent<any> = (props) => {
  return null;
};

type EditTagModalTypes = {
  className?: string;
  open: boolean;
  onClose: () => any;
  tag: any;
};

export const EditTagModal: FunctionComponent<EditTagModalTypes> = (props) => {
  const { className, open, onClose, tag } = props;

  return (
    <Modal isOpen={open} toggle={onClose} className={className}>
      {tag && (
        <ModalHeader toggle={onClose}>Edit tag {props.tag.name}</ModalHeader>
      )}
      {tag && <TagForm tag={tag} />}
    </Modal>
  );
};
