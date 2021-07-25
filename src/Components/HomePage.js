import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  TextField,
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import "./homepage.css";
import Team from "./team";
import { selectItems } from "../features/basketSlice";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const HomePage = (props) => {
  const [user] = useAuthState(auth);
  const items = useSelector(selectItems);
  const UpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  console.log(items.length);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={3} key={pokemonId}>
        <Card onClick={() => history.push(`/${id}`)} className="card">
          <CardMedia
            className="homepage_cardmedia"
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className="homepage_cardcontent">
            <Typography>{`${id}  ${UpperCase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <Container>
        <Header>
          <SearchIconContainer>
            <AvatarContainer>
              <Avatar src={user?.photoURL} onClick={() => auth.signOut()} />
              <h4>{user.displayName}</h4>
            </AvatarContainer>
            <Toolbar>
              <SearchIconInput>
                <SearchIcon />

                <TextFieldIcon onChange={handleSearchChange} label="Search" />
              </SearchIconInput>
            </Toolbar>
          </SearchIconContainer>

          <h3>Team</h3>
          {items.map((item, i) => (
            <Team
              key={i}
              id={item.id}
              name={item.name}
              sprites={item.sprites}
            />
          ))}
        </Header>
        <DataContainer>
          {pokemonData ? (
            <Grid container spacing={3} className="homepage_gridcontainer">
              {Object.keys(pokemonData).map(
                (pokemonId) =>
                  pokemonData[pokemonId].name.includes(filter) &&
                  getPokemonCard(pokemonId)
              )}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </DataContainer>
      </Container>
    </>
  );
};

export default HomePage;

const SearchIconInput = styled.div`
  display: flex;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);
  background-color: whitesmoke;

  > .MuiSvgIcon-root {
    color: black;

    margin-left: 10px;
    margin-top: 15px;
  }
`;

const TextFieldIcon = styled(TextField)`
  background-color: whitesmoke;
  margin-top: 5px;
  outline: 0;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
`;
const Header = styled.div`
  flex: 0.3;
  height: 50vh;
  width: 100%;
  justify-content: center;
  align-items: center;

  > h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border: 1px solid gray;
    margin-left: 25px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);
    background-color: #716d88;
    color: white;
  }
`;

const DataContainer = styled.div`
  flex: 0.7;
  margin-right: 140px;
  border: none;
`;

const SearchIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 12px;
  align-items: center;
  margin-top: 25px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border: 1px solid black;
  height: 80px;
  width: 100px;
  justify-content: center;
  background-color: #c8c6e3;
  border-radius: 10px;
  > h4 {
    color: black;
    font-size: 18px;
  }
`;
