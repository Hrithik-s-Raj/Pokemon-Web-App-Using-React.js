// eslint-disable-next-line no-restricted-globals
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectItems } from "../features/basketSlice";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./homepage.css";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

function Team({ id, name }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector(selectItems);
  const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div>
      <FavContainer>
        <Grid item xs={3} key={items}>
          <Card className="card_fav">
            <CloseIconContainer>
              <IconButton>
                <CloseIcon onClick={removeItemFromBasket} />
              </IconButton>
            </CloseIconContainer>
            <CardMedia
              onClick={() => history.push(`/${id}`)}
              className="homepage_cardmedia"
              image={fullImageUrl}
              style={{ width: "100px", height: "100px" }}
            />
            <CardContent className="homepage_cardcontent">
              <Typography>{`${id}  ${name}`}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </FavContainer>
    </div>
  );
}

export default Team;

const FavContainer = styled.div`
  display: grid;
  place-items: center;
  overflow-y: hidden;
`;

const CloseIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
