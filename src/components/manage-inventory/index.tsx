import React, { FunctionComponent, useEffect, useState } from "react";
import { getCurrentUser } from "../../actions/DataActions";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { Row, Col, Button } from "reactstrap";
import { ManageItemCard } from "../manage-item-card";
import { useFormatMessage } from "../../i18n/i18n.service";

type ManageInventoryProps = {};

export const ManageInventory: FunctionComponent<ManageInventoryProps> = (props) => {
  const user = getCurrentUser();

  const [inventory, setInventory] = useState<Array<any>>([]);

  const fetchInventory = () => {
    axiosInstance.get(`/inventory?token=${user.token}`).then(({ data }) => setInventory(data));
  };

  useEffect(fetchInventory, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={"Inventory"}>
      <Row>
        {inventory.map((inventoryItem) => (
          <Col key={inventoryItem.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <ManageItemCard
              description={inventoryItem.description}
              name={inventoryItem.name}
              onEditClick={() => {}}
              onDeleteClick={() => {}}
            />
          </Col>
        ))}
        <Col xl={3} lg={4} md={6} xs={12} className="mb-4">
          <Button color="primary" onClick={() => {}}>
            New Item
          </Button>
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};
