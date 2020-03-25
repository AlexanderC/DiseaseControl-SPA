import React, { FunctionComponent } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import { TagForm } from "../forms/TagForm";
import { useFormatMessage } from "../shared";

type TagFormModalTypes = {
  className?: string;
  open: boolean;
  onClose: () => any;
  onSubmit: (tag: any) => any;
  tag: any;
};

export const TagFormModal: FunctionComponent<TagFormModalTypes> = (props) => {
  const { className, open, onClose, tag } = props;
  const i10n = useFormatMessage();

  return (
    <Modal isOpen={open} toggle={onClose} className={className}>
      {tag && (
        <>
          <ModalHeader toggle={onClose}>
            {props.tag.name || i10n("tag.addNew")}:
          </ModalHeader>
          <ModalBody>
            <TagForm tag={tag} onSubmit={props.onSubmit} onReset={onClose} />
          </ModalBody>
        </>
      )}
    </Modal>
  );
};
