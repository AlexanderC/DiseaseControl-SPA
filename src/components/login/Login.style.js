import styled from 'styled-components/macro';

export const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 30vh;
`;

export const LoginContainer = styled.div`
  width: 320px;
  margin: 0 auto;
  background: #5ca1cd;
  padding: 40px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const InputContainer = styled.div`
  margin: 30px;
`;

export const InputTitle = styled.div`
  font-weight: bold;
`;

export const Input = styled.input`
  width: 260px;
  height: 20px;
  border-radius: 5px;
  outline: none;
  margin-top: 5px;
`;

export const LoginButton = styled.button`
  background: aliceblue;
  color: #5ca1cd;
  padding: 10px 30px;
  border: 1px solid aliceblue;
  border-radius: 5px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  margin-left: 100px;
  width: 120px;
`;
