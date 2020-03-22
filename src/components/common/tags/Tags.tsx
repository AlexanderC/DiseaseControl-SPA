import React from 'react';
import { connect } from 'react-redux';
import { Tag } from '../../../resources/types';
import { Container, Row, Col, Badge} from 'reactstrap';

type Props = {
  data: Tag[],
  tagColors: {
    [s: string]: string
  }
}

function Tags({ data, tagColors }: Props) {
  return(
    <Container>
      <Row>
        {
          data.map((t, i) => (
            <Badge key={t.id} className="m-1" color={tagColors[t.id]}>
              {t.description}
            </Badge>
          ))
        }
      </Row>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({ tagColors: state.data.tagColors })

export default connect(mapStateToProps, {})(Tags);