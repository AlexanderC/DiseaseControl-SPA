import React, { FunctionComponent } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useFormatMessage } from "../../shared";

type ManageItemCardProp = {
  name: string;
  description: string;
  onEditClick: () => any;
  onDeleteClick: () => any;
};

export const ManageItemCard: FunctionComponent<ManageItemCardProp> = (
  props
) => {
  const i10n = useFormatMessage();

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardText>{props.description}</CardText>
        <Button onClick={props.onEditClick}>{i10n("edit")}</Button>
        <Button color="danger" className="ml-1" onClick={props.onDeleteClick}>
          {i10n("delete")}
        </Button>
      </CardBody>
    </Card>
  );
};
