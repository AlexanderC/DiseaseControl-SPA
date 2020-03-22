import React, { useEffect } from "react";
import * as T from '../../resources/types';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getHospitals } from '../../actions/DataActions';
import { Container, Row, Col, Card, CardTitle, CardText, ListGroup, ListGroupItem, Badge, CardBody, Button } from "reactstrap";

function sliceStringAndAppendDots(str: string, sliceAt = 15) {
  let slicedString = str || '';
  if (slicedString.length > sliceAt) {
    slicedString = `${slicedString.slice(0, sliceAt)}...`;
  }
  return slicedString;
}

type Props = {
  data: T.Data[],
  getHospitals: () => void;
}

function Dashboard({ data, getHospitals }: Props) {
  useEffect(() => {
    getHospitals();
  }, [getHospitals])

  return (
    <Container className="my-3">
      <Row>
        {data.map(d => (
          <Col key={d.id} xs="12" sm="6" md="4" lg="3" className="mb-4">
            <Card className="h-100">
              <CardBody>
                <CardTitle tag="h5">
                  {sliceStringAndAppendDots(d.name, 35)}
                </CardTitle>
                <CardText>
                  {sliceStringAndAppendDots(d.description, 100)}
                </CardText>
                <Button color="primary" tag={Link} to={`/details/${d.id}`}>
                  Details
                </Button>
              </CardBody>
              <ListGroup flush className="mt-auto">
                {d.inventory.map(p => (
                  <ListGroupItem key={p.id} className="d-flex justify-content-between align-items-center">
                    {p.name}
                    <Badge pill>{p.HospitalInventory.quantity}</Badge>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  return {
    data: state.data.data
  }
}

const mapDispatchToProps = {
  getHospitals
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);