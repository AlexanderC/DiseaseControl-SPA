import React, { FunctionComponent } from "react";
import { Button, Badge } from "reactstrap";

type HospitalDetailedInventoryTypes = {
  detailed: object | null;
};

export const HospitalDetailedInventory: FunctionComponent<HospitalDetailedInventoryTypes> = (props) => {
  return props.detailed ? (
    <div>
      {Object.entries(props.detailed).map(([key, value]) => (
        <Button key={key} color="danger" outline disabled size="sm" className="mt-1 mr-1">
          {key} <Badge color="secondary">{value}</Badge>
        </Button>
      ))}
    </div>
  ) : null;
};
