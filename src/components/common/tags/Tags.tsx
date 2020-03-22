import React from 'react';
import { useSelector } from 'react-redux';
import { Tag } from '../../../resources/types';
import { Container, Row, Badge} from 'reactstrap';
import { selectTagColors } from "../../../reducers/Combiner";

type Props = {
  data: Tag[]
}

export default function Tags({ data }: Props) {
  const tagColors = useSelector(selectTagColors);
  return(
    <Container>
      <Row>
        <p>
          {
            data.map((t, i) => (
              <Badge key={t.id} className="m-1" color={tagColors[t.id]}>
                {t.description}
              </Badge>
            ))
          }
        </p>
      </Row>
    </Container>
  )
}