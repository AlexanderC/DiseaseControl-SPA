import React, { FunctionComponent, useEffect } from "react";
import { useModal } from "../shared/useModal";
import { BaseModal } from "../modals/BaseModal";
import { ItemForm } from "../forms/ItemForm";
import { useFormatMessage } from "../i18n/i18n.service";

type InventoryFormModalProps = {
  inventory: any;
  onClose: any;
  onSubmit: any;
};

export const InventoryFormModal: FunctionComponent<InventoryFormModalProps> = (props) => {
  const { isOpen, open, close } = useModal(false);

  const closeModal = () => {
    close();
    props.onClose();
  };

  const onEdit = async (inventory: any) => {
    await props.onSubmit(inventory);
    close();
  };

  useEffect(() => {
    if (props.inventory) {
      open();
    } else {
      close();
    }
  }, [props.inventory, open, close]);

  const i10n = useFormatMessage();

  return (
    <BaseModal isOpen={isOpen} close={closeModal} header={props.inventory?.name || i10n("tag.addNew")}>
      <ItemForm tag={props.inventory} onReset={closeModal} onSubmit={onEdit} />
    </BaseModal>
  );
};
