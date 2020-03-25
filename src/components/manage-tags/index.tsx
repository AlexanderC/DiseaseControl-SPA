import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { getCurrentUser } from "../../actions/DataActions";
import { TagForm } from "../../forms/TagForm";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import { BaseModal } from "../../modals/BaseModal";
import axiosInstance from "../../services/Axios";
import { useFormatMessage } from "../../shared";
import { useModal } from "../../shared/useModal";
import { Confirmation } from "../confirmation";
import { ManageItemCard } from "../manage-item-card";

type ManageTagsProps = {};

export const ManageTags: FunctionComponent<ManageTagsProps> = (props) => {
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
            <ManageItemCard
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
