import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
import { HospitalItemsForm } from "../../forms/HospitalItemsForm";
import { useFormatMessage } from "../../i18n/i18n.service";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import { BaseModal } from "../../modals/BaseModal";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { InventoryAmountModal } from "../../modals/InventoryAmountModal";
import axiosInstance from "../../services/Axios";
import Notify from "../../services/Notify";
import { Tags } from "../../shared/tags.component";
import { useModal } from "../../shared/useModal";
import { AddHospital } from "../add-hospital";

type ManageHospitalsProps = {};

type HospitalAction = "delete" | "edit-tags" | "edit-inventory" | "edit-supervisors" | null;

export const ManageHospitals: FunctionComponent<ManageHospitalsProps> = (props) => {
  const user = getCurrentUser();

  const [hospitals, setHospitals] = useState<Array<any>>([]);
  const [tags, setTags] = useState<Array<any>>([]);
  const [inventories, setInventories] = useState<Array<any>>([]);
  const [supervisors, setSupervisors] = useState<Array<any>>([]);

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

  const fetchSupervisors = () => {
    axiosInstance
      .get(`/admin/identity?token=${user.token}&paginate=100&page=1&limit=100`)
      .then(({ data }) => setSupervisors(data.results));
  };

  const fetchInitialData = () => {
    fetchHospitals();
    fetchTags();
    fetchInventories();
    fetchSupervisors();
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

  const dismissModal = () => {
    setActionType(null);
    setSelectedHospital(null);
    close();
  };

  const onFormSubmit = async (items: any) => {
    try {
      switch (actionType) {
        case "edit-tags":
          await patchHospital(selectedHospital.id, { tags: items.map((i: any) => i.name) });
          break;
        case "edit-inventory":
          await patchHospital(selectedHospital.id, { inventory: items.map((i: any) => i.name) });
          break;
        case "edit-supervisors":
          await patchHospital(selectedHospital.id, { supervisor: items.length ? items[0].id : null });
      }
      Notify.success(i10n("defaultSuccessMessage"));
    } catch (e) {
      Notify.error(i10n("defaultErrorMessage"));
    } finally {
      dismissModal();
      fetchHospitals();
    }
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
      await axiosInstance.delete("/admin/hospital/" + selectedHospital.id + "?token=" + user.token, {
        data: hospitalObjectToBody(selectedHospital),
      });
      Notify.success(i10n("defaultSuccessMessage"));
    } catch (e) {
      Notify.error(i10n("defaultErrorMessage"));
    } finally {
      dismissModal();
      fetchHospitals();
    }
  };

  const i10n = useFormatMessage();

  const formProps = useMemo(() => {
    switch (actionType) {
      case "edit-inventory": {
        return {
          availableItems: inventories,
          selectedItems: selectedHospital?.inventory,
        };
      }
      case "edit-tags": {
        return {
          availableItems: tags,
          selectedItems: selectedHospital?.tags,
        };
      }
      case "edit-supervisors": {
        return {
          availableItems: supervisors,
          selectedItems: selectedHospital.supervisors,
          displayItemValue: (item: any) => item.username,
          maxItems: 1,
        };
      }
      default: {
        return {
          availableItems: [],
          selectedItems: [],
        };
      }
    }
  }, [selectedHospital, actionType, tags, inventories, supervisors]);

  return (
    <AdminDashboardLayout title={i10n("hospitals")}>
      <BaseModal isOpen={isOpen} close={close} header={i10n("edit")}>
        <HospitalItemsForm onSubmit={onFormSubmit} onDismiss={dismissModal} {...formProps} />
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
        <InventoryAmountModal afterSubmit={fetchHospitals}>
          {({ openInventoryForm }: any) => (
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
                        <ListGroupItem className="p-0" key={i.id} onClick={() => setSelectedHospital(h)}>
                          <Link
                            to="#"
                            role="button"
                            className="p-0 text-primary bg-transparent"
                            style={{ cursor: "pointer" }}
                            onClick={() => openInventoryForm(h, i)}
                          >
                            <span>
                              {i.name} ({i.HospitalInventory.quantity}/{i.HospitalInventory.total})
                            </span>
                          </Link>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  </td>
                  <td>
                    <ListGroup flush>
                      {h.supervisors.map((i: any) => (
                        <ListGroupItem className="p-0" key={i.id} tag="a" href={"/admin/users/" + i.id}>
                          {i10n("user")}:{i.id}
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
                        <DropdownItem onClick={() => openItemsModal("edit-supervisors", h)}>
                          {i10n("edit.supervisor")}
                        </DropdownItem>
                        <DropdownItem onClick={() => openDeleteModal(h)}>{i10n("delete")}</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </InventoryAmountModal>
      </Table>
      <AddHospital onUpdate={() => fetchHospitals()} />
    </AdminDashboardLayout>
  );
};
