import React, { FunctionComponent, useState, useEffect } from "react";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import axiosInstance from "../../services/Axios";
import { getCurrentUser } from "../../actions/DataActions";
import {
  Card,
  CardTitle,
  CardText,
  Row,
  Col,
  CardBody,
  Button,
} from "reactstrap";
import { EditTagModal } from "./EditTagModal";

type TagCardProp = {
  tag: any;
  onEditClick: (tag: any) => any;
};

const TagCard: FunctionComponent<TagCardProp> = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{props.tag.name}</CardTitle>
        <CardText>{props.tag.description}</CardText>
        <Button onClick={() => props.onEditClick(props.tag)}>Edit</Button>
      </CardBody>
    </Card>
  );
};

type EditTagsProps = {};

export const EditTags: FunctionComponent<EditTagsProps> = (props) => {
  const [tags, setTags] = useState<Array<any>>([]);
  const user = getCurrentUser();

  const [editModal, setEditModal] = useState(false);

  const openModal = (data: any) => {
    setActiveTag(data);
    setEditModal(true);
  };

  const closeModal = () => setEditModal(false);

  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/tag?token=${user.token}`)
      .then(({ data }) => setTags(data));
  }, []);

  return (
    <AdminDashboardLayout title="Edit Tags">
      <EditTagModal open={editModal} onClose={closeModal} tag={activeTag} />
      <Row>
        {tags.map((tag) => (
          <Col key={tag.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <TagCard tag={tag} onEditClick={openModal} />
          </Col>
        ))}
      </Row>
    </AdminDashboardLayout>
  );
};
