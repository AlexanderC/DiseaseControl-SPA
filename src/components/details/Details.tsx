import React, { useEffect, useMemo, useCallback, useState } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getHospitals, updateInventoryItemCount } from '../../actions/DataActions';
import { selectHospitals } from "../../reducers/Combiner";
import { Container, ListGroup, ListGroupItem, Badge, Button } from "reactstrap";
import Tags from "../common/tags/Tags";

function Details(props: RouteComponentProps<{ id: string }>) {
  const { match } = props
  const hospitalId = parseInt(match.params.id, 10);
  const dispatch = useDispatch()
  const hospitals = useSelector(selectHospitals)
  const details = useMemo(() => (
    hospitals.find(d => d.id === hospitalId)
  ), [hospitals, hospitalId]);

  useEffect(() => {
    if (!details) {
      dispatch(getHospitals())
    }
  }, [dispatch, details])

  const [updatingCount, setUpdatingCount] = useState(false)
  const updateInventItemCount = useCallback((inventItemId, count) => {
    setUpdatingCount(true)
    dispatch(updateInventoryItemCount(hospitalId, inventItemId, count))
      .then(() => setUpdatingCount(false))
  }, [dispatch, hospitalId])

  if (!details) return null

  return (
    <Container className="my-3">
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      <Tags data={details.tags}/>

      <h4>Inventory</h4>

      <ListGroup tag="fieldset" disabled={updatingCount} className="mb-4">
        {details.inventory.length === 0 && <ListGroupItem>No items</ListGroupItem>}
        {details.inventory.map(item => (
          <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center">
            {item.name} ({new Date(item.updatedAt).toDateString()})
            <div>
              <Button
                size="sm" color="link" className="mr-1"
                onClick={() => updateInventItemCount(item.id, item.HospitalInventory.quantity + 1)}>
                <span>+</span>
              </Button>
              <Button
                size="sm" color="link" className="mr-1"
                disabled={item.HospitalInventory.quantity === 0}
                onClick={() => updateInventItemCount(item.id, item.HospitalInventory.quantity - 1)}>
                <span>-</span>
              </Button>
              <Badge>{item.HospitalInventory.quantity}</Badge>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <h4>History</h4>

      <ListGroup>
        {(details.events ?? []).length === 0 && <ListGroupItem>Empty</ListGroupItem>}
        {(details.events ?? []).map(e => (
          <ListGroupItem>
            {e.time} - {e.inventoryType} - {e.type}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Details;