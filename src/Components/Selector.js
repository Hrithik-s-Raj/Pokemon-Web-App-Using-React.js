/* eslint-disable jsx-a11y/alt-text */
// eslint-disable-next-line no-restricted-globals
import React, { useEffect, useState } from "react";
import {
  Typography,
  Link,
  CircularProgress,
  Button,
  Card,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectItems } from "../features/basketSlice";
import styled from "styled-components";
import axios from "axios";
import { CardMedia } from "@material-ui/core";

const Pokemon = (props) => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  console.log(items.length);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const addItemToBasket = () => {
    const pokfav = {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      specius: pokemon.species,
      weight: pokemon.weight,
    };

    console.log(pokfav);

    if (items.length < 6) {
      dispatch(addToBasket(pokfav));
    } else alert("Only 6 can be added to your team !Its Already 6 sorry!");
  };

  const generatePokemon = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    return (
      <>
        <CardContainer>
          <Card>
            <CardMediaContainer>
              <CardMedia>
                <CardImg>
                  <img src={fullImageUrl} />
                </CardImg>
              </CardMedia>
            </CardMediaContainer>

            <TextContainer>
              <Typography variant="h2">{name}</Typography>

              <Typography variant="h4">Pokemon Details</Typography>
              <Typography>
                {"Species: "}
                <Link href={species.url}>{species.name} </Link>
              </Typography>
              <Typography>Height: {height} </Typography>
              <Typography>Weight: {weight} </Typography>
              <Typography variant="h6"> Types:</Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}> {`${name}`}</Typography>;
              })}
            </TextContainer>
          </Card>
        </CardContainer>
      </>
    );
  };

  return (
    <>
      <Loader>{pokemon === undefined && <CircularProgress />}</Loader>

      {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      <ButtonContainer>
        {pokemon !== undefined && (
          <Button variant="contained" onClick={() => history.push("/")}>
            Back To Home
          </Button>
        )}
        <Button onClick={addItemToBasket} variant="contained">
          Add to team
        </Button>{" "}
      </ButtonContainer>
    </>
  );
};

export default Pokemon;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.9;
  place-items: center;
  margin-top: 20px;
`;

const CardMediaContainer = styled.div`
  height: 200px;
  width: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);
  background-color: #7b9eed;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  > Button {
    margin-left: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImg = styled.div`
  > img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    width: 180px;
    margin: auto;
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
