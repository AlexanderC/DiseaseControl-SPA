import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Button, Container, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem } from "reactstrap";
import { getHospitals, updateInventoryItemCount } from "../actions/DataActions";
import { selectHospitals } from "../reducers/Combiner";
import { InventoryItem } from "../resources/types";
import { useFormatMessage } from "../i18n/i18n.service";
import Notify from "../services/Notify";
import { Tags } from "../shared/tags.component";

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
          <InventoryItemRow key={inventoryItem.id} inventoryItem={inventoryItem} />
        ))}
      </ListGroup>
    </Container>
  );
}

type InventoryItemProps = {
  inventoryItem: InventoryItem;
};

function InventoryItemRow(props: InventoryItemProps) {
  const { inventoryItem } = props;
  const { HospitalId, updatedAt, quantity, id } = inventoryItem.HospitalInventory;
  const inventUpdatedAt = new Date(updatedAt);
  const dispatch = useDispatch();
  const [inputQuantity, setInputQuantity] = useState<string>(quantity.toString());
  const [updating, setUpdating] = useState(false);
  const l10n = useFormatMessage();

  const save = useCallback(() => {
    setUpdating(true);
    dispatch(updateInventoryItemCount(HospitalId, id, parseInt(inputQuantity, 10))).then(() => {
      Notify.info(l10n("notif.saved"));
      setUpdating(false);
    });
  }, [dispatch, HospitalId, id, inputQuantity, l10n]);

  return (
    <ListGroupItem key={inventoryItem.id} className="d-flex justify-content-between align-items-center">
      <div>
        <div className="text-uppercase">{inventoryItem.name}</div>
        <small className="text-muted">{inventUpdatedAt.toLocaleString()}</small>
      </div>
      <InputGroup size="sm" style={{ width: "100px" }}>
        <Input
          type="number"
          min="0"
          disabled={updating}
          value={inputQuantity}
          onChange={(e) => setInputQuantity(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <Button color="success" disabled={updating} onClick={save}>
            ✓
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </ListGroupItem>
  );
}