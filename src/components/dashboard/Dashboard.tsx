import React, { useEffect, useCallback, useState } from "react";
import { Link } from 'react-router-dom';
import * as T from '../../resources/types';
import { useSelector, useDispatch } from "react-redux";
import { getHospitals, getTags } from '../../actions/DataActions';
import { Container, Row, Col, Card, CardTitle, CardText, ListGroup, ListGroupItem, Badge, CardBody, Button } from "reactstrap";
import { selectHospitals, selectTags, selectTagColors } from "../../reducers/Combiner";
import Tags from '../common/tags/Tags';

function Dashboard() {
  const hospitals = useSelector(selectHospitals);
  const tags = useSelector(selectTags);
  const tagColors = useSelector(selectTagColors);
  const dispatch = useDispatch()

  const [selectedTags, setSelectedTags] = useState<T.Tag[]>([]);
  const [filteredData, setFilteredData] = useState<T.Hospital[]>([]);

  useEffect(() => {
    dispatch(getHospitals());
    dispatch(getTags());
  }, [dispatch])

  useEffect(() => {
    setFilteredData(hospitals);
  }, [hospitals]);

  const handleTagClick = useCallback((tag: T.Tag) => {
    let newSelectedTags = selectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = newSelectedTags.filter(t => t.id !== tag.id);
    } else {
      newSelectedTags.push(tag);
    }

    const selectedTagIds = newSelectedTags.map(t => t.id);
    let newFilteredData;
    if (selectedTagIds.length) {
      newFilteredData = hospitals.filter(d =>
        selectedTagIds.every(id => d.tags.map(t => t.id).includes(id))
      );
    } else {
      newFilteredData = hospitals;
    }

    setSelectedTags(newSelectedTags);
    setFilteredData(newFilteredData);
  }, [selectedTags, hospitals]);

  return (
    <Container className="my-3">
      <Row className="ml-1 mb-2">
        {
          tags.map(t => (
            <button
              key={t.id}
              type="button"
              className={`m-1 btn btn-${tagColors[t.id]}`}
              onClick={() => handleTagClick(t)}
            >
              {t.description}
            </button>
          ))
        }
      </Row>
      <Row>
        {filteredData.map(d => (
          <Col key={d.id} xs="12" sm="6" md="4" lg="3" className="mb-4">
            <Card className="h-100">
              <CardBody>
                <CardTitle tag="h5">
                  {sliceStringAndAppendDots(d.name, 35)}
                </CardTitle>
                <CardText>
                  {sliceStringAndAppendDots(d.description, 100)}
                </CardText>
                <Tags data={d.tags}/>
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

export default Dashboard;

function sliceStringAndAppendDots(str: string, sliceAt = 15) {
  let slicedString = str || '';
  if (slicedString.length > sliceAt) {
    slicedString = `${slicedString.slice(0, sliceAt)}...`;
  }
  return slicedString;
}
