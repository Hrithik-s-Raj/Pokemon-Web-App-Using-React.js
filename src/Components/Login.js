import React from "react";
import styled from "styled-components";
import { provider, auth } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <LoginContainer>
      <Header>
        <img
          alt=" "
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
        />
      </Header>
      <LoginLeft>
        <img
          alt=""
          src="https://www.freepnglogos.com/uploads/pokemon-png/ash-and-pikachu-dashiesparkle-pokemon-png-29.png"
        />
      </LoginLeft>

      <LoginRight>
        <ButtonContainer>
          <button onClick={signIn}>Login</button>
        </ButtonContainer>

        <TextContainer>
          <h2>Task:</h2>
          <h3>#To Build a Pokemon Web app using React.js and PokemonAPI</h3>
        </TextContainer>
      </LoginRight>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  display: flex;

  height: 100vh;
  width: 100%;
  background-color: whitesmoke;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  background-color: blue;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);

  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  color: white;
  > img {
    height: 40px;
  }
`;

const LoginLeft = styled.div`
  display: flex;
  flex: 0.7;
  height: 100vh;
  width: 55px;
  > img {
    margin-left: -60px;
    margin-top: 80px;
  }
`;

const LoginRight = styled.div`
  display: flex;
  position: relative;
  flex: 0.3;
  height: 100px;
  margin: auto;
  margin-right: 60px;
  flex-direction: column;

  justify-content: center;
`;

const ButtonContainer = styled.button`
  display: flex;

  border: none;
  background-color: whitesmoke;
  justify-content: center;

  > button {
    height: 50px;
    width: 160px;
    background-color: #6474fb;
    color: white;
    font-weight: 900;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    cursor: pointer;
    border-radius: 10px;

    :hover {
      background-color: gray;
      transition-duration: 6ms;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;

  > h2 {
    display: flex;
    margin-top: 300px;
    font-size: 19px;
  }
  > h3 {
    display: flex;
    margin-top: 330px;
    font-size: 19px;
    font-weight: 300;
  }
`;
