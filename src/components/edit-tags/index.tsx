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
import { TagFormModal } from "./../../modals/TagFormModal";
import { useFormatMessage } from "../../shared";

type TagCardProp = {
  name: string;
  description: string;
  onEditClick: () => any;
};

const TagCard: FunctionComponent<TagCardProp> = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardText>{props.description}</CardText>
        <Button onClick={() => props.onEditClick()}>Edit</Button>
      </CardBody>
    </Card>
  );
};

type EditTagsProps = {};

export const EditTags: FunctionComponent<EditTagsProps> = (props) => {
  const user = getCurrentUser();
  const emptyTag = {
    name: "",
    description: "",
  };

  const [tags, setTags] = useState<Array<any>>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [activeTag, setActiveTag] = useState(null);

  const openModal = (data: any) => {
    setActiveTag(data);
    setEditModal(true);
  };

  const closeModal = () => setEditModal(false);

  const fetchTags = () => {
    axiosInstance
      .get(`/tag?token=${user.token}`)
      .then(({ data }) => setTags(data));
  };

  const onEditTag = async (tag: any) => {
    await axiosInstance.post(
      `/admin/tag?token=${user.token}`,
      tags.map((t) => {
        if (t.id === tag.id) {
          return tag;
        }
        return t;
      })
    );
    closeModal();
    fetchTags();
  };

  const onAddTag = async (tag: any) => {
    await axiosInstance.post(`/admin/tag?token=${user.token}`, [...tags, tag]);
    closeModal();
    fetchTags();
  };

  const onFormSubmit = async (tag: any) => {
    // if (tag.id) {
    //   await onEditTag(tag);
    // } else {
    //   await onAddTag(tag);
    // }
  };

  useEffect(fetchTags, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("tag.list")}>
      <TagFormModal
        open={editModal}
        onClose={closeModal}
        tag={activeTag}
        onSubmit={onFormSubmit}
      />
      <Row>
        {tags.map((tag) => (
          <Col key={tag.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <TagCard
              description={tag.description}
              name={tag.name}
              onEditClick={() => openModal(tag)}
            />
          </Col>
        ))}
        <Col xl={3} lg={4} md={6} xs={12} className="mb-4">
          <Button color="primary" onClick={() => openModal(emptyTag)}>
            {i10n("tag.addNew")}
          </Button>
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};
