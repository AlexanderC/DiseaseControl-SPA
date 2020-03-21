import styled from 'styled-components/macro';

export const DetailsContainer = styled.div`
  height: calc(100vh - 250px);
  width: 100%;
  padding: 50px;
  display: flex;
`;

export const DataContainer = styled.div`
  width: 45%;
  background: white;
  border: 2px solid #5ca1cd;
  border-radius: 5px;
  position: relative;
`;

export const Title = styled.div`
  font-size: 30px;
  text-align: center;
  color: #5ca1cd;
  font-weight: bold;
  margin-top: 30px;
`;

export const Image = styled.img`
  filter: contrast(0.3);
  width: 256px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
`;

export const Description = styled.div`
  color: #5ca1cd;
  font-weight: bold;
  padding: 20px 60px;
  font-size: 20px;
  margin-top: 40px;
`;

export const ParametersList = styled.div`
  position: absolute;
  bottom: 10px;
  left: 20px;
  width: calc(100% - 40px);
  height: 200px;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const Parameter = styled.div`
  width: 100%;
  display: flex;
  height: 70px;
  line-height: 70px;
  background: #5ca1cd;
  margin-top: 10px;
  border-radius: 5px;
  position: relative;
`;

export const ParameterTitle = styled.div`
  color: aliceblue;
  margin-left: 30px;
  font-size: 25px;
`;

export const ParameterCountContainer = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
`;

export const ActionButton = styled.div`
  background: aliceblue;
  border: 1px solid aliceblue;
  color: #5ca1cd;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  text-align: center;
  margin-top: 15px;
  line-height: 40px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  margin: 15px 10px;

  :hover {
    border: 1px solid aliceblue;
    background: #5ca1cd;
    color: aliceblue;
  }
`;

export const Count = styled.div`
  background: aliceblue;
  color: #5ca1cd;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  text-align: center;
  margin-top: 15px;
  line-height: 40px;
  font-weight: bold;
  font-size: 20px;
`;

export const HistoryList = styled.div`
  width: 45%;
  margin-left: 20px;
  background: white;
  border: 2px solid #5ca1cd;
  border-radius: 5px;
  height:100%;
  overflow-y: scroll;
  padding: 0px 10px;
`;

export const HistoryItem = styled.div`
  display: flex;
  padding: 20px 50px;
  border-bottom: 1px solid #5ca1cd;
  color: #5ca1cd;
`;

export const DateTime = styled.div`

`;

export const EventTitle = styled.div`

`;

export const EventOrigin = styled.div`

`;
