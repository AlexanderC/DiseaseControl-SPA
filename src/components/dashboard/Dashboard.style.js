import styled from 'styled-components/macro';

export const Dashboard = styled.div`
  height: calc(100vh - 120px);
  width: 100%;
  padding: 30px;
`;

export const DashboardList = styled.div`
  display: block;
`;

export const Title = styled.div`
  font-weight: bold;
  text-align: center;
  font-size: 25px;
  color: #5ca1cd;
  height: 60px;
`;

export const Description = styled.div`
  margin: 15px;
  color: #5ca1cd;
  height: 70px;
`;

export const Image = styled.img`
  margin-left: 25%;
  margin-top: 5px;
  filter: contrast(0.3);
  width: 128px;
`;

export const DetailsContainer = styled.div`
  height: 360px;
  width: 250px;
  background: white;
  border: 2px solid #5ca1cd;
  border-radius: 5px;
  margin-right: 20px;
  margin-top: 20px;
  padding: 20px;
  float: left;
  cursor: pointer;
  position: relative;
`;

export const ParametersList = styled.div`
  position: absolute;
  bottom: 10px;
  width: 80%;
  height: 70px;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const ParameterTitle = styled.div`
  color: aliceblue;
  width: 90%;
`;

export const ParameterContainer = styled.div`
  display: flex;
  margin: 5px 0px;
  background: #5ca1cd;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
`;

export const ParameterCount = styled.div`
  float: right;
  color: #5ca1cd;
  background: aliceblue;
  font-weight: bold;
  border-radius: 50%;
  width: 18px;
  text-align: center;
`;