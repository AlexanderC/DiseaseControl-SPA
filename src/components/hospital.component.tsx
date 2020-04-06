import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import { getHospitals, getHospitalsLive } from "../actions/DataActions";
import { useFormatMessage } from "../i18n/i18n.service";
import { InventoryAmountModal } from "../modals/InventoryAmountModal";
import { selectHospitals } from "../reducers/Combiner";
import { InventoryItem } from "../resources/types";
import { Tags } from "../shared/tags.component";
import { HospitalDetailedInventory } from "./hospital-detailed-inventory.component";

export function Hospital(props: RouteComponentProps<{ id: string }>) {
  const l10n = useFormatMessage();
  const { match } = props;
  const hospitalId = parseInt(match.params.id, 10);
  const dispatch = useDispatch();
  const hospitals = useSelector(selectHospitals);
  const hospital = useMemo(() => hospitals.find((d) => d.id === hospitalId), [hospitals, hospitalId]);

  useEffect(() => {
    if (!hospital) {
      dispatch(getHospitals());
    }
  }, [dispatch, hospital]);

  if (!hospital) return null;

  const updatedAt = new Date(hospital.updatedAt);

  return (
    <Container className="my-3">
      <h1>{hospital.name}</h1>
      <small className="text-muted">
        {updatedAt.toLocaleDateString()} - {updatedAt.toLocaleTimeString()}
      </small>
      <p>{hospital.description}</p>

      <div className="mb-2">
        <Tags data={hospital.tags} />
      </div>

      <h4>{l10n("inventory")}</h4>

      <ListGroup className="mb-4">
        {hospital.inventory.map((inventoryItem) => (
          <InventoryItemRow key={inventoryItem.id} hospital={hospital} inventoryItem={inventoryItem} />
        ))}
      </ListGroup>
    </Container>
  );
}

type InventoryItemProps = {
  inventoryItem: InventoryItem;
  hospital: any;
};

function InventoryItemRow(props: InventoryItemProps) {
  const { inventoryItem } = props;
  const { updatedAt, total } = inventoryItem.HospitalInventory;
  const inventUpdatedAt = new Date(updatedAt);
  const dispatch = useDispatch();

  const afterSubmit = () => dispatch(getHospitalsLive());
  const l10n = useFormatMessage();

  return (
    <ListGroupItem key={inventoryItem.id} className="d-flex justify-content-between align-items-center">
      <div>
        <div>
          <div className="text-uppercase">
            {inventoryItem.name} ({total})
          </div>
          <small className="text-muted">{inventUpdatedAt.toLocaleString()}</small>
        </div>
        <HospitalDetailedInventory detailed={inventoryItem.HospitalInventory.detailed} />
      </div>
      <InventoryAmountModal hideTotalAmount afterSubmit={afterSubmit}>
        {({ openInventoryForm }: any) => (
          <Button onClick={() => openInventoryForm(props.hospital, inventoryItem)}>{l10n("action")}</Button>
        )}
      </InventoryAmountModal>
    </ListGroupItem>
  );
}
