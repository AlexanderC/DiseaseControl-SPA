import React, { FunctionComponent, useEffect, useState } from "react";
import { Table, Button, Badge } from "reactstrap";
import { getCurrentUser } from "../../actions/DataActions";
import { useFormatMessage } from "../../i18n/i18n.service";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { AddUserModal } from "../../modals/AddUserModal";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import Notify from "../../services/Notify";

type ManageUsersProps = {};

const prettifyUser = (user: any) => ({
  ...user,
  createdAt: new Date(user.createdAt).toLocaleString(),
});

export const ManageUsers: FunctionComponent<ManageUsersProps> = (props) => {
  const user = getCurrentUser();
  const l10n = useFormatMessage();

  const [users, setUsers] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pagination, setPagination] = useState<any>();

  const fetchUsers = () => {
    axiosInstance.get(`/admin/identity?token=${user.token}&limit=100`).then(({ data }) => {
      setUsers(data.results.map(prettifyUser));
      setPagination(data.meta);
    });
  };

  const fetchInitialData = () => {
    fetchUsers();
  };

  useEffect(fetchInitialData, []);

  const [deleteUser, setDeleteUser] = useState<any>(null);

  const onDeleteUser = async () => {
    try {
      await axiosInstance.delete(`/admin/identity/${deleteUser.id}?token=${user.token}`);
      setDeleteUser(null);
      fetchInitialData();
      Notify.success(l10n("defaultSuccessMessage"));
    } catch (e) {
      Notify.error(e?.response?.data?.message ?? l10n("defaultErrorMessage"));
    }
  };

  return (
    <AdminDashboardLayout title={l10n("users")}>
      <ConfirmationModal
        onAccept={onDeleteUser}
        open={deleteUser}
        onDismiss={() => setDeleteUser(null)}
        title={`${l10n("deleteUser")} ${deleteUser?.username}`}
      />
      <AddUserModal afterSubmit={fetchInitialData}>
        {({ openModal }: any) => (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>{l10n("email")}</th>
                  <th>{l10n("type")}</th>
                  <th>{l10n("dateCreated")}</th>
                  <th>{l10n("hospitals")}</th>
                  <th>{l10n("action")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <th scope="row">{u.username}</th>
                    <td>{u.type}</td>
                    <td>{u.createdAt}</td>
                    <td>
                      {u.hospitals.map((hospital: any) => (
                        <Badge className="mr-1 mb-1" key={hospital.id}>
                          {hospital.name}
                        </Badge>
                      ))}
                    </td>
                    <td>
                      <Button color="danger" onClick={() => setDeleteUser(u)}>
                        {l10n("delete")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="primary" onClick={openModal}>
              {l10n("addUser")}
            </Button>
          </div>
        )}
      </AddUserModal>
    </AdminDashboardLayout>
  );
};
