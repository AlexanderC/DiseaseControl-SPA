import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import * as T from "../../resources/types";
import { useSelector, useDispatch } from "react-redux";
import { getHospitals, getTags } from "../../actions/DataActions";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  Badge,
  CardBody,
  Button,
} from "reactstrap";
import {
  selectHospitals,
  selectTags,
  selectTagColors,
} from "../../reducers/Combiner";
import { Tags } from "../common/tags/Tags";

export function Dashboard() {
  const hospitals = useSelector(selectHospitals);
  const tags = useSelector(selectTags);
  const tagColors = useSelector(selectTagColors);
  const dispatch = useDispatch();

  const [selectedTags, setSelectedTags] = useState<T.Tag[]>([]);
  const [filteredData, setFilteredData] = useState<T.Hospital[]>([]);

  useEffect(() => {
    dispatch(getHospitals());
    dispatch(getTags());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(hospitals);
  }, [hospitals]);

  const handleTagClick = useCallback(
    (tag: T.Tag) => {
      let newSelectedTags = selectedTags;
      if (selectedTags.includes(tag)) {
        newSelectedTags = newSelectedTags.filter((t) => t.id !== tag.id);
      } else {
        newSelectedTags.push(tag);
      }

      const selectedTagIds = newSelectedTags.map((t) => t.id);
      let newFilteredData;
      if (selectedTagIds.length) {
        newFilteredData = hospitals.filter((d) =>
          selectedTagIds.every((id) => d.tags.map((t) => t.id).includes(id))
        );
      } else {
        newFilteredData = hospitals;
      }

      setSelectedTags(newSelectedTags);
      setFilteredData(newFilteredData);
    },
    [selectedTags, hospitals]
  );

  return (
    <Container className="my-3">
      <div className="mb-2">
        {tags.map((t) => {
          const isSelected = selectedTags.includes(t);
          return (
            <Button
              key={t.id}
              outline
              color={tagColors[t.id]}
              active={isSelected}
              className="mr-1 mb-1"
              onClick={() => handleTagClick(t)}
            >
              {t.description}
            </Button>
          );
        })}
      </div>
      <Row>
        {filteredData.map((d) => {
          return (
            <Col key={d.id} xs="12" sm="6" md="6" lg="3" className="mb-4">
              <Card className="h-100">
                <CardBody>
                  <CardTitle tag="h4">
                    {d.canManage ? (
                      <Link to={`/details/${d.id}`}>
                        {truncate(d.name, 50)}
                      </Link>
                    ) : (
                      truncate(d.name, 50)
                    )}
                  </CardTitle>
                  <CardText>
                    {d.description}
                    <Tags data={d.tags} />
                  </CardText>
                </CardBody>
                <ListGroup flush className="mt-auto">
                  {d.inventory.map((p) => {
                    const inventUpdatedAt = new Date(
                      p.HospitalInventory.updatedAt
                    );
                    return (
                      <ListGroupItem
                        key={p.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        {p.name}
                        <small className="text-muted">
                          {inventUpdatedAt.toLocaleString()}
                        </small>
                        <Badge pill>{p.HospitalInventory.quantity}</Badge>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

function truncate(text: string = "", sliceAt = 15) {
  return text.length > sliceAt ? `${text.slice(0, sliceAt)}...` : text;
}
