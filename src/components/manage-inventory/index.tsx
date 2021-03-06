import React, { FunctionComponent, useEffect, useState } from "react";
import { getCurrentUser } from "../../actions/DataActions";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { Row, Col, Button } from "reactstrap";
import { ManageItemCard } from "../manage-item-card";
import { useFormatMessage } from "../../i18n/i18n.service";
import { ItemFormModal } from "../../modals/ItemFormModal";
import { ConfirmationModal } from "../../modals/ConfirmationModal";

type ManageInventoryProps = {};

export const ManageInventory: FunctionComponent<ManageInventoryProps> = (props) => {
  const user = getCurrentUser();

  const [inventories, setInventories] = useState<Array<any>>([]);

  const fetchInventory = () => {
    axiosInstance.get(`/inventory?token=${user.token}`).then(({ data }) => setInventories(data));
  };

  const postInventory = (items: Array<any>) => {
    return axiosInstance.post(`/admin/inventory?token=${user.token}`, items);
  };

  const [editableInventory, setEditableInventory] = useState<any>(null);
  const onEditClose = () => setEditableInventory(null);
  const onEditSubmit = async (item: any) => {
    await postInventory(
      inventories.map((i) => {
        if (i.id === item.id) {
          return item;
        }
        return i;
      })
    );
    setEditableInventory(null);
    fetchInventory();
  };

  const [blankInventory, setBlankInventory] = useState<any>(null);
  const onAddNewClose = () => setBlankInventory(null);
  const onAddNewSubmit = async (inventory: any) => {
    await postInventory([...inventories, inventory]);
    setBlankInventory(null);
    fetchInventory();
  };

  const [inventoryToDelete, setInventoryToDelete] = useState<any>(null);
  const deleteInventory = async () => {
    await postInventory(inventories.filter((i) => i.id !== inventoryToDelete.id));
    setInventoryToDelete(null);
    fetchInventory();
  };

  useEffect(fetchInventory, []);

  const l10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={l10n("inventory")}>
      <ItemFormModal
        item={editableInventory || blankInventory}
        onSubmit={editableInventory ? onEditSubmit : onAddNewSubmit}
        onClose={editableInventory ? onEditClose : onAddNewClose}
        blankTitle={l10n("inventory.addNew")}
      />
      <ConfirmationModal
        open={!!inventoryToDelete}
        onAccept={deleteInventory}
        onDismiss={() => setInventoryToDelete(null)}
        title={l10n("inventory.deleteTitle") + " " + inventoryToDelete?.name}
      />
      <Row>
        {inventories.map((inventoryItem) => (
          <Col key={inventoryItem.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <ManageItemCard
              description={inventoryItem.description}
              name={inventoryItem.name}
              onEditClick={() => setEditableInventory(inventoryItem)}
              onDeleteClick={() => setInventoryToDelete(inventoryItem)}
            />
          </Col>
        ))}
        <Col xl={3} lg={4} md={6} xs={12} className="mb-4">
          <Button color="primary" onClick={() => setBlankInventory({ name: "", description: "" })}>
            {l10n("inventory.addNew")}
          </Button>
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};
