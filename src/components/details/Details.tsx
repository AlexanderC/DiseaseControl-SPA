import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as S from './Details.style';

const data: any[] = [];

export default function Details() {
  return (<S.DetailsContainer>
    <S.DataContainer>
      <S.Title>

      </S.Title>
      <S.Image></S.Image>

      <Tabs>
        <TabList>
          <Tab>Parametri</Tab>
          <Tab>Istorie operatii</Tab>
        </TabList>

        <TabPanel>
            <S.ParametersList>
            {
              data.map(d => (
                <S.Parameter>
                  <S.ParameterTitle>Pat</S.ParameterTitle>
                  <S.ParameterCountContainer>
                    <S.DecrementButton>-</S.DecrementButton>
                    <S.Count>3</S.Count>
                    <S.IncrementButton>+</S.IncrementButton>
                  </S.ParameterCountContainer>
                </S.Parameter>
              ))
            }
          </S.ParametersList>
        </TabPanel>
        <TabPanel>
         <S.HistoryList>
           {
             data.map(d => (
               <S.HistoryItem>
                 <S.DateTime></S.DateTime>
                 <S.EventTitle></S.EventTitle>
                 <S.EventOrigin></S.EventOrigin>
               </S.HistoryItem>
             ))
           }
         </S.HistoryList>
        </TabPanel>
      </Tabs>
    </S.DataContainer>
  </S.DetailsContainer>)
};