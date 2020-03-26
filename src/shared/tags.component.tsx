import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "reactstrap";
import { selectTagColors } from "../reducers/Combiner";
import { Tag } from "../resources/types";

type Props = {
  data: Tag[];
};

export function Tags({ data }: Props) {
  const tagColors = useSelector(selectTagColors);
  return (
    <div className="d-flex flex-wrap">
      {data.map((t, i) => (
        <Badge key={t.id} className="mr-1 mb-1" color={tagColors[t.id]}>
          {t.description}
        </Badge>
      ))}
    </div>
  );
}
