import React, { useEffect, useState, useCallback } from "react";
import axios from '../../services/Axios';
import * as T from '../../resources/types';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getHospitals, getTags } from '../../actions/DataActions';
import { Container, Row, Col, Card, CardTitle, CardText, ListGroup, ListGroupItem, Badge, CardBody, Button, ButtonToggle } from "reactstrap";
import Tags from "../common/tags/Tags";

function sliceStringAndAppendDots(str: string, sliceAt = 15) {
  let slicedString = str || '';
  if (slicedString.length > sliceAt) {
    slicedString = `${slicedString.slice(0, sliceAt)}...`;
  }
  return slicedString;
}

type Props = {
  data: T.Data[],
  tags: T.Tag[],
  getHospitals: () => void;
  getTags: () => void;
  tagColors: {
    [s:string]: string
  }
}

function Dashboard({ data, tags, getHospitals, getTags, tagColors }: Props) {
  const [filteredData, setFilteredData] = useState<T.Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<T.Tag[]>([]);

  useEffect(() => {
    getHospitals();
    getTags();
  }, [getHospitals])

  const handleTagClick = useCallback((tag: T.Tag) => {
    let newSelectedTags = [...selectedTags];
    if (selectedTags.find(t => t.id === tag.id)) {
      newSelectedTags = newSelectedTags.filter(t => t.id !== tag.id);
    } else {
      newSelectedTags.push(tag);
    }

    setSelectedTags(newSelectedTags);
  }, [selectedTags]);

  return (
    <Container className="my-3">
      <Row className="ml-1 mb-2">
        {
          tags.map(t => {
            const isSelected = selectedTags.find(tag => tag.id === t.id);
            return (
              <ButtonToggle key={t.id} className={`m-1 ${isSelected && 'active'} btn-${tagColors[t.id]}`} onClick={() => handleTagClick(t)}>
                {t.description}
              </ButtonToggle>
            )
          })
        }
      </Row>
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

const mapStateToProps = (state: any) => {
  return {
    data: state.data.data,
    tags: state.data.tags,
    tagColors: state.data.tagColors
  }
}

const mapDispatchToProps = {
  getHospitals,
  getTags
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);