import React, { FunctionComponent, useEffect } from "react";
import { useModal } from "../shared/useModal";
import { BaseModal } from "../modals/BaseModal";
import { ItemForm } from "../forms/ItemForm";

type ItemFormModalProps = {
  item: any;
  onClose: any;
  onSubmit: any;
  blankTitle: string;
};

export const ItemFormModal: FunctionComponent<ItemFormModalProps> = (props) => {
  const { isOpen, open, close } = useModal(false);

  const closeModal = () => {
    close();
    props.onClose();
  };

  const submitItem = async (item: any) => {
    await props.onSubmit(item);
    close();
  };

  useEffect(() => {
    if (props.item) {
      open();
    } else {
      close();
    }
  }, [props.item, open, close]);

  return (
    <BaseModal isOpen={isOpen} close={closeModal} header={props.item?.name || props.blankTitle}>
      <ItemForm item={props.item} onReset={closeModal} onSubmit={submitItem} />
    </BaseModal>
  );
};
