import React, { FunctionComponent } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { useFormatMessage } from "../../i18n/i18n.service";

type ManageItemCardProp = {
  name: string;
  description: string;
  onEditClick: () => any;
  onDeleteClick: () => any;
};

export const ManageItemCard: FunctionComponent<ManageItemCardProp> = (props) => {
  const l10n = useFormatMessage();

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardText>{props.description}</CardText>
        <Button onClick={props.onEditClick}>{l10n("edit")}</Button>
        <Button color="danger" className="ml-1" onClick={props.onDeleteClick}>
          {l10n("delete")}
        </Button>
      </CardBody>
    </Card>
  );
};
