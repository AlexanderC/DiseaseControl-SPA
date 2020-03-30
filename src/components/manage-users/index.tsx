import React, { FunctionComponent, useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { getCurrentUser } from "../../actions/DataActions";
import { useFormatMessage } from "../../i18n/i18n.service";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { AddUserModal } from "../../modals/AddUserModal";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import Notify from "../../services/Notify";

type ManageUsersProps = {};

export const ManageUsers: FunctionComponent<ManageUsersProps> = (props) => {
  const user = getCurrentUser();

  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>();

  const fetchUsers = () => {
    axiosInstance.get(`/admin/identity?token=${user.token}`).then(({ data }) => {
      setUsers(data.results);
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
      await axiosInstance.delete(`/admin/identity/${deleteUser.id}?token=${user.token}&limit=100`);
      setDeleteUser(null);
      fetchInitialData();
      Notify.success(i10n("defaultSuccessMessage"));
    } catch (e) {
      Notify.error(e?.response?.data?.message ?? i10n("defaultErrorMessage"));
    } finally {
    }
  };

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("users")}>
      <ConfirmationModal
        onAccept={onDeleteUser}
        open={deleteUser}
        onDismiss={() => setDeleteUser(null)}
        title={`${i10n("deleteUser")} ${deleteUser?.username}`}
      />
      <AddUserModal afterSubmit={fetchInitialData}>
        {({ openModal }: any) => (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>{i10n("name")}</th>
                  <th>{i10n("type")}</th>
                  <th>{i10n("dateCreated")}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <th scope="row">{u.username}</th>
                    <td>{u.type}</td>
                    <td>{u.createdAt}</td>
                    <td>
                      <Button color="danger" onClick={() => setDeleteUser(u)}>
                        {i10n("delete")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="primary" onClick={openModal}>
              {i10n("addUser")}
            </Button>
          </div>
        )}
      </AddUserModal>
    </AdminDashboardLayout>
  );
};
