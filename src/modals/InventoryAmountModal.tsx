import React, { FunctionComponent, useState, useRef } from "react";
import { useModal } from "../shared/useModal";
import { BaseModal } from "./BaseModal";
import { InventoryAmountForm } from "../forms/InventoryAmountForm";
import { useFormatMessage } from "../i18n/i18n.service";

type InventoryAmountModalProps = {
  children: any;
  afterSubmit: () => any;
};

export const InventoryAmountModal: FunctionComponent<InventoryAmountModalProps> = (props) => {
  const { isOpen, open, close } = useModal(false);
  const l10n = useFormatMessage();
  const initialData = useRef({ hospital: null, inventory: null });
  const [data, setData] = useState<{ hospital: any; inventory: any }>(initialData.current);

  const afterSubmit = () => {
    dismissModal();
    props.afterSubmit();
  };

  const dismissModal = () => {
    setData(initialData.current);
    close();
  };

  const openForm = (hospital: any, inventory: any) => {
    setData({ hospital, inventory });
    open();
  };

  const Child = props.children;
  return (
    <>
      <Child openInventoryForm={openForm} />
      <BaseModal isOpen={isOpen} close={dismissModal} header={l10n("quantity")}>
        <InventoryAmountForm
          value={{
            total: data.inventory?.HospitalInventory.total,
            detailed: data.inventory?.HospitalInventory.detailed,
          }}
          hospitalId={data.hospital?.id}
          hospitalInventoryId={data.inventory?.HospitalInventory.id}
          afterSubmit={afterSubmit}
          onDismiss={dismissModal}
        />
      </BaseModal>
    </>
  );
};
