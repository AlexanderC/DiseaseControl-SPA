import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { getCurrentUser } from "../../actions/DataActions";
import { AdminDashboardLayout } from "../../layouts/AdminDashboardLayout";
import { ConfirmationModal } from "../../modals/ConfirmationModal";
import { TagFormModal } from "../../modals/TagFormModal";
import axiosInstance from "../../services/Axios";
import { useFormatMessage } from "../../shared";
import { ManageItemCard } from "../manage-item-card";

type ManageTagsProps = {};

export const ManageTags: FunctionComponent<ManageTagsProps> = (props) => {
  const user = getCurrentUser();

  const [tags, setTags] = useState<Array<any>>([]);

  const fetchTags = () => {
    axiosInstance
      .get(`/tag?token=${user.token}`)
      .then(({ data }) => setTags(data));
  };

  const postTags = (tags: Array<any>) => {
    return axiosInstance.post(`/admin/tag?token=${user.token}`, tags);
  };

  const [editableTag, setEditableTag] = useState<any>(null);
  const onEditClose = () => setEditableTag(null);
  const onEditSubmit = async (tag: any) => {
    await postTags(
      tags.map((t) => {
        if (t.id === tag.id) {
          return tag;
        }
        return t;
      })
    );
    setEditableTag(null);
  };

  const [blankTag, setBlankTag] = useState<any>(null);
  const onAddNewClose = () => setBlankTag(null);
  const onAddNewSubmit = async (tag: any) => {
    await postTags([...tags, tag]);
    setBlankTag(null);
  };

  const [tagToDelete, setTagToDelete] = useState<any>(null);
  const deleteTag = async () => {
    await postTags(tags.filter((t) => t.id !== tagToDelete.id));
    setTagToDelete(null);
    fetchTags();
  };

  useEffect(fetchTags, []);

  const i10n = useFormatMessage();

  return (
    <AdminDashboardLayout title={i10n("tag.list")}>
      <ConfirmationModal
        open={!!tagToDelete}
        onAccept={deleteTag}
        onDismiss={() => setTagToDelete(null)}
        title={i10n("tag.deleteTitle") + " " + tagToDelete?.name}
      />
      <TagFormModal
        tag={editableTag}
        onClose={onEditClose}
        onSubmit={onEditSubmit}
      />
      <TagFormModal
        tag={blankTag}
        onClose={onAddNewClose}
        onSubmit={onAddNewSubmit}
      />
      <Row>
        {tags.map((tag) => (
          <Col key={tag.name} xl={3} lg={4} md={6} xs={12} className="mb-4">
            <ManageItemCard
              description={tag.description}
              name={tag.name}
              onEditClick={() => setEditableTag(tag)}
              onDeleteClick={() => setTagToDelete(tag)}
            />
          </Col>
        ))}
        <Col xl={3} lg={4} md={6} xs={12} className="mb-4">
          <Button
            color="primary"
            onClick={() => setBlankTag({ name: "", description: "" })}
          >
            {i10n("tag.addNew")}
          </Button>
        </Col>
      </Row>
    </AdminDashboardLayout>
  );
};