import React from "react";
import { useSelector } from "react-redux";
import { Tag } from "../../../resources/types";
import { Badge } from "reactstrap";
import { selectTagColors } from "../../../reducers/Combiner";

type Props = {
  data: Tag[];
};

export function Tags({ data }: Props) {
  const tagColors = useSelector(selectTagColors);
  return (
    <div>
      {data.map((t, i) => (
        <Badge key={t.id} className="mr-1" color={tagColors[t.id]}>
          {t.description}
        </Badge>
      ))}
    </div>
  );
}
