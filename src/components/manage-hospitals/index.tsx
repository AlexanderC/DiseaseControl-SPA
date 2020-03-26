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

type ManageHospitalsProps = {};

export const ManageHospitals: FunctionComponent<ManageHospitalsProps> = (props) => {
  const user = getCurrentUser();

  const [hospitals, setHospitals] = useState<Array<any>>([]);

  const fetchHospitals = () => {
    axiosInstance.get(`/hospital?token=${user.token}`).then(({ data }) => setHospitals(data));
  };

  useEffect(fetchHospitals, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("hospitals")}>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Tags</th>
            <th>Inventories</th>
            <th>Supervisors</th>
            <th>Action</th>
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
                    Options
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Edit Tags</DropdownItem>
                    <DropdownItem>Edit Inventory</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminDashboardLayout>
  );
};
