import React, { FunctionComponent, useEffect, useState } from "react";
import { getCurrentUser } from "../../actions/DataActions";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { useFormatMessage } from "../../shared";

type ManageInventoryProps = {};

export const ManageInventory: FunctionComponent<ManageInventoryProps> = (
  props
) => {
  const user = getCurrentUser();

  const [inventory, setInventory] = useState<Array<any>>([]);

  const fetchInventory = () => {
    axiosInstance
      .get(`/inventory?token=${user.token}`)
      .then(({ data }) => setInventory(data));
  };

  useEffect(fetchInventory, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("tag.list")}>
      {JSON.stringify(inventory)}
    </AdminDashboardLayout>
  );
};
