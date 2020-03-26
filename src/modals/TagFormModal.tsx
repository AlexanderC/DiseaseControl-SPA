import React, { FunctionComponent, useEffect } from "react";
import { useModal } from "../shared/useModal";
import { BaseModal } from "../modals/BaseModal";
import { TagForm } from "../forms/TagForm";
import { useFormatMessage } from "../shared";

type TagFormModalProps = {
  tag: any;
  onClose: any;
  onSubmit: any;
};

export const TagFormModal: FunctionComponent<TagFormModalProps> = (props) => {
  const { isOpen, open, close } = useModal(false);

  const closeModal = () => {
    close();
    props.onClose();
  };

  const editTag = async (tag: any) => {
    await props.onSubmit(tag);
    close();
  };

  useEffect(() => {
    if (props.tag) {
      open();
    } else {
      close();
    }
  }, [props.tag, open, close]);

  const i10n = useFormatMessage();

  return (
    <BaseModal
      isOpen={isOpen}
      close={closeModal}
      header={props.tag?.name || i10n("tag.addNew")}
    >
      <TagForm tag={props.tag} onReset={closeModal} onSubmit={editTag} />
    </BaseModal>
  );
};