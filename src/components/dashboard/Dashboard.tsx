import React from "react";
import * as S from './Dashboard.style';
import Card from './card/Card';

const data: any[] = [];

export default function Dashboard() {
  return (<S.Dashboard>
    <S.DashboardList>
      {
        data.map(d => (
          <Card />
        ))
      }
    </S.DashboardList>
  </S.Dashboard>)
};