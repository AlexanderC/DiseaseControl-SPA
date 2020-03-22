import React, { useEffect, useMemo, useCallback, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getHospitals,
  updateInventoryItemCount,
} from "../../actions/DataActions";
import { selectHospitals } from "../../reducers/Combiner";
import { Container, ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import Tags from "../common/tags/Tags";

function Details(props: RouteComponentProps<{ id: string }>) {
  const { match } = props;
  const hospitalId = parseInt(match.params.id, 10);
  const dispatch = useDispatch();
  const hospitals = useSelector(selectHospitals);
  const hospital = useMemo(() => hospitals.find((d) => d.id === hospitalId), [
    hospitals,
    hospitalId,
  ]);

  useEffect(() => {
    if (!hospital) {
      dispatch(getHospitals());
    }
  }, [dispatch, hospital]);

  const [updatingCount, setUpdatingCount] = useState(false);
  const updateInventItemCount = useCallback(
    (inventItemId, count) => {
      setUpdatingCount(true);
      dispatch(
        updateInventoryItemCount(hospitalId, inventItemId, count)
      ).then(() => setUpdatingCount(false));
    },
    [dispatch, hospitalId]
  );

  if (!hospital) return null;

  return (
    <Container className="my-3">
      <h1>{hospital.name}</h1>
      <p>{hospital.description}</p>
      <Tags data={hospital.tags} />

      <h4>Inventory</h4>

      <ListGroup tag="fieldset" disabled={updatingCount} className="mb-4">
        {hospital.inventory.length === 0 && (
          <ListGroupItem>No items</ListGroupItem>
        )}
        {hospital.inventory.map((inventory) => (
          <ListGroupItem
            key={inventory.id}
            className="d-flex justify-content-between align-items-center"
          >
            {inventory.name} ({new Date(inventory.updatedAt).toDateString()})
            <div>
              <Button
                size="sm"
                color="link"
                className="mr-1"
                onClick={() =>
                  updateInventItemCount(
                    inventory.HospitalInventory.id,
                    inventory.HospitalInventory.quantity + 1
                  )
                }
              >
                <span>+</span>
              </Button>
              <Button
                size="sm"
                color="link"
                className="mr-1"
                disabled={inventory.HospitalInventory.quantity === 0}
                onClick={() =>
                  updateInventItemCount(
                    inventory.HospitalInventory.id,
                    inventory.HospitalInventory.quantity - 1
                  )
                }
              >
                <span>-</span>
              </Button>
              <Badge>{inventory.HospitalInventory.quantity}</Badge>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <h4>History</h4>

      <ListGroup>
        {(hospital.events ?? []).length === 0 && (
          <ListGroupItem>Empty</ListGroupItem>
        )}
        {(hospital.events ?? []).map((e) => (
          <ListGroupItem>
            {e.time} - {e.inventoryType} - {e.type}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export default Details;
