import React, { FunctionComponent, useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Button, Row, Col } from "reactstrap";
import { useFormatMessage } from "../i18n/i18n.service";

type HospitalItemsFormType = {
  onSubmit: any;
  onDismiss: any;
  selectedItems: any[];
  availableItems: any[];
};

export const HospitalItemsForm: FunctionComponent<HospitalItemsFormType> = (props) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  useEffect(() => {
    setSelectedItems(Array.from(props.selectedItems));
  }, [props.selectedItems]);

  const itemIsActive = (item: any) => {
    return !!selectedItems.find((i) => i.id === item.id);
  };

  const toggleItem = (item: any) => {
    if (itemIsActive(item)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems(Array.from([...selectedItems, item]));
    }
  };

  const i10n = useFormatMessage();

  return (
    <div>
      <ListGroup>
        {props.availableItems.map((item) => {
          return (
            <ListGroupItem
              tag="button"
              className="text-left"
              key={item.id}
              active={itemIsActive(item)}
              onClick={() => toggleItem(item)}
            >
              {item.name}
            </ListGroupItem>
          );
        })}
      </ListGroup>
      <div className="mt-3">
        <Button type="submit" className="mr-3" onClick={() => props.onSubmit(selectedItems)}>
          {i10n("submit")}
        </Button>
        <Button type="reset" color="danger" onClick={props.onDismiss}>
          {i10n("reset")}
        </Button>
      </div>
    </div>
  );
};
