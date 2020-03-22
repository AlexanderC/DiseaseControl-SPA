import React, { useEffect, useMemo } from "react";
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getHospitals } from '../../actions/DataActions';
import { selectHospitals } from "../../reducers/Combiner";
import { Container, ListGroup, ListGroupItem, Badge } from "reactstrap";
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

  if (!details) return null

  return (
    <Container className="my-3">
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      <Tags data={details.tags}/>

      <h4>Inventory</h4>

      <ListGroup className="mb-4">
        {details.inventory.length === 0 && <ListGroupItem>No items</ListGroupItem>}
        {details.inventory.map(p => (
          <ListGroupItem key={p.id} className="d-flex justify-content-between align-items-center">
            {p.name}
            <Badge>{p.HospitalInventory.quantity}</Badge>
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