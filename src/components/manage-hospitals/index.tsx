import React, { FunctionComponent, useEffect, useState } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ListGroup,
  ListGroupItem,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { getCurrentUser } from "../../actions/DataActions";
import { useFormatMessage } from "../../i18n/i18n.service";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { Tags } from "../../shared/tags.component";
import { BaseModal } from "../../modals/BaseModal";
import { useModal } from "../../shared/useModal";
import { HospitalItemsForm } from "../../forms/HospitalItemsForm";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { AddHospital } from "../add-hospital";

type ManageHospitalsProps = {};

type HospitalAction = "delete" | "edit-tags" | "edit-inventory" | null;

export const ManageHospitals: FunctionComponent<ManageHospitalsProps> = (props) => {
  const user = getCurrentUser();

  const [hospitals, setHospitals] = useState<Array<any>>([]);
  const [tags, setTags] = useState<Array<any>>([]);
  const [inventories, setInventories] = useState<Array<any>>([]);

  const [actionType, setActionType] = useState<HospitalAction>();
  const [selectedHospital, setSelectedHospital] = useState<any>();

  const fetchHospitals = () => {
    axiosInstance.get(`/hospital?token=${user.token}`).then(({ data }) => setHospitals(data));
  };

  const fetchTags = () => {
    axiosInstance.get(`/tag?token=${user.token}`).then(({ data }) => setTags(data));
  };

  const fetchInventories = () => {
    axiosInstance.get(`/inventory?token=${user.token}`).then(({ data }) => setInventories(data));
  };

  const fetchInitialData = () => {
    fetchHospitals();
    fetchTags();
    fetchInventories();
  };

  useEffect(fetchInitialData, []);

  const { isOpen, close, open } = useModal();

  const openItemsModal = (type: HospitalAction, hospital: any) => {
    setSelectedHospital(hospital);
    setActionType(type);
    open();
  };

  const openDeleteModal = (hospital: any) => {
    setSelectedHospital(hospital);
    setActionType("delete");
  };

  const patchHospital = (hospitalId: any, body: any) => {
    return axiosInstance.patch("/admin/hospital/" + hospitalId + "?token=" + user.token, body);
  };

  const onFormSubmit = async (items: any) => {
    try {
      if (actionType === "edit-tags") {
        await patchHospital(selectedHospital.id, { tags: items.map((i: any) => i.name) });
      } else if (actionType === "edit-inventory") {
        console.log(items);

        await patchHospital(selectedHospital.id, { inventory: items.map((i: any) => i.name) });
      }
    } catch (e) {
      // show some notification
    } finally {
      setSelectedHospital(null);
      close();
      fetchHospitals();
    }
  };

  const dismissModal = () => {
    setActionType(null);
    setSelectedHospital(null);
    close();
  };

  const hospitalObjectToBody = ({ tags, description, inventory, supervisors }: any) => {
    return {
      tags: tags.map((t: any) => t.name),
      inventory: inventory.map((i: any) => i.name),
      description,
      ...(supervisors.length ? { supervisor: supervisors[0].id } : {}),
    };
  };

  const deleteSelectedHospital = async () => {
    try {
      console.log(selectedHospital);
      console.log(user.token);

      await axiosInstance.delete("/admin/hospital/" + selectedHospital.id + "?token=" + user.token, {
        data: hospitalObjectToBody(selectedHospital),
      });
    } catch (e) {
      // show some notification
    } finally {
      dismissModal();
      fetchHospitals();
    }
  };

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("hospitals")}>
      <BaseModal isOpen={isOpen} close={close} header={i10n("edit")}>
        <HospitalItemsForm
          onSubmit={onFormSubmit}
          onDismiss={dismissModal}
          availableItems={actionType === "edit-inventory" ? inventories : tags}
          selectedItems={actionType === "edit-inventory" ? selectedHospital?.inventory : selectedHospital?.tags}
        />
      </BaseModal>
      <ConfirmationModal
        title={`${i10n("hospital.delete")} ${selectedHospital?.name}`}
        open={actionType === "delete"}
        onAccept={deleteSelectedHospital}
        onDismiss={dismissModal}
      />
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>{i10n("name")}</th>
            <th>{i10n("tags")}</th>
            <th>{i10n("inventory")}</th>
            <th>{i10n("supervisors")}</th>
            <th>{i10n("action")}</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((h) => (
            <tr key={h.id}>
              <th scope="row">{h.id}</th>
              <td>{h.name}</td>
              <td>
                <Tags data={h.tags} />
              </td>
              <td>
                <ListGroup flush>
                  {h.inventory.map((i: any) => (
                    <ListGroupItem className="p-0" key={i.id}>
                      {i.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </td>
              <td>
                <ListGroup flush>
                  {h.supervisors.map((i: any) => (
                    <ListGroupItem className="p-0" key={i.id} tag="a" href={"/admin/users/" + i.id}>
                      {i.id}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </td>
              <td>
                <UncontrolledDropdown setActiveFromChild>
                  <DropdownToggle color="light" caret>
                    {i10n("options")}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => openItemsModal("edit-tags", h)}>{i10n("edit.tags")}</DropdownItem>
                    <DropdownItem onClick={() => openItemsModal("edit-inventory", h)}>
                      {i10n("edit.inventory")}
                    </DropdownItem>
                    <DropdownItem onClick={() => openDeleteModal(h)}>{i10n("delete")}</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddHospital onUpdate={() => fetchHospitals()} />
    </AdminDashboardLayout>
  );
};
