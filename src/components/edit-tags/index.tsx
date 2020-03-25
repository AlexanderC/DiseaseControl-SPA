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
import { useFormatMessage } from "../../shared";
import { BaseModal } from "../../modals/BaseModal";
import { useModal } from "../../shared/useModal";
import { TagForm } from "../../forms/TagForm";
import { Confirmation } from "../confirmation";

type TagCardProp = {
  name: string;
  description: string;
  onEditClick: () => any;
  onDeleteClick: () => any;
};

const TagCard: FunctionComponent<TagCardProp> = (props) => {
  const i10n = useFormatMessage();

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardText>{props.description}</CardText>
        <Button onClick={props.onEditClick}>{i10n("tag.edit")}</Button>
        <Button color="danger" className="ml-1" onClick={props.onDeleteClick}>
          {i10n("tag.delete")}
        </Button>
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

  const {
    isOpen: editModalOpen,
    close: closeEditModal,
    open: openEditModal,
  } = useModal();

  const [activeTag, setActiveTag] = useState<any>(null);

  const open = (tag: any) => {
    setActiveTag(tag);
    openEditModal();
  };

  const {
    isOpen: deleteModalOpen,
    close: closeDeleteModal,
    open: openDeleteModal,
  } = useModal();

  const [tagToDelete, setTagToDelete] = useState<any>(null);

  const onDelete = (tag: any) => {
    setTagToDelete(tag);
    openDeleteModal();
  };

  const fetchTags = () => {
    axiosInstance
      .get(`/tag?token=${user.token}`)
      .then(({ data }) => setTags(data));
  };

  const postTags = (tags: Array<any>) => {
    return axiosInstance.post(`/admin/tag?token=${user.token}`, tags);
  };

  const editTag = async (tag: any) => {
    await postTags(
      tags.map((t) => {
        if (t.id === tag.id) {
          return tag;
        }
        return t;
      })
    );
  };

  const addTag = async (tag: any) => {
    await postTags([...tags, tag]);
  };

  const deleteTag = async () => {
    await postTags(tags.filter((t) => t.id !== tagToDelete.id));
    closeDeleteModal();
    fetchTags();
  };

  const onFormSubmit = async (tag: any) => {
    if (tag.id) {
      await editTag(tag);
    } else {
      await addTag(tag);
    }
    closeEditModal();
    fetchTags();
  };

  useEffect(fetchTags, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("tag.list")}>
      <BaseModal
        isOpen={editModalOpen}
        close={closeEditModal}
        header={activeTag?.name || i10n("tag.addNew")}
      >
        <TagForm
          onSubmit={onFormSubmit}
          tag={activeTag}
          onReset={closeEditModal}
        />
      </BaseModal>
      <BaseModal
        isOpen={deleteModalOpen}
        close={closeDeleteModal}
        header={i10n("tag.deleteTitle") + " " + tagToDelete?.name}
      >
        <Confirmation onAccept={deleteTag} onDecline={closeDeleteModal} />
      </BaseModal>
      <Row>
        {tags.map((tag) => (
          <Col key={tag.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <TagCard
              description={tag.description}
              name={tag.name}
              onEditClick={() => open(tag)}
              onDeleteClick={() => onDelete(tag)}
            />
          </Col>
        ))}
        <Col xl={3} lg={4} md={6} xs={12} className="mb-4">
          <Button color="primary" onClick={() => open(emptyTag)}>
            {i10n("tag.addNew")}
          </Button>
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};
