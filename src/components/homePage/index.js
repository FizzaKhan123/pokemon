import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/images/black-logo3d.jpg";
import { useQuery, useLazyQuery } from "@apollo/client";
import Card from "../pokemonCard";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GET_All_POKEMON } from "../gql/Query";
import { GET_POKEMON_DETAILS_NAME } from "../gql/Query";
import { GET_POKEMON_DETAILS_DEX_NUMBER } from "../gql/Query";
import { GET_POKEMON_DETAILS_ABILITY } from "../gql/Query";
import SearchIcon1 from "../../assets/images/search-icon1.png";
import SearchIcon2 from "../../assets/images/search-icon2.png";
import CircularProgress from "@mui/material/CircularProgress";
import "./index.css";

const Index = () => {
  const [name, setName] = useState("");
  const [dexNumber, setDexNumber] = useState();

  const [pokAbility, setPokAbility] = useState();
  const pokemon = useRef([]);
  const navigate = useNavigate();
  const handlePokemonDetail = (item) => {
    console.log("NAvigating Item");
    navigate(`/pokemonDetail/${item.key}`);
  };
  //name
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleClickName = () => {
    getPokemonsbyName({ variables: { pokemon: name } });
  };
  //dexNumber
  const handleChangeDexNumber = (event) => {
    setDexNumber(event.target.value);
  };

  const handleClickDexNumber = () => {
    let dexInt = parseInt(dexNumber);
    getPokemonsbyDexNumber({ variables: { number: dexInt } });
  };

  //ability

  const handleChangeAbility = (event) => {
    setPokAbility(event.target.value);
  };

  const handleClickAbility = () => {
    console.log(pokAbility);
    getPokemonsbyAbility({ variables: { ability: pokAbility } });
  };

  // Query For getting All Pokemons
  const allPokemons = useQuery(GET_All_POKEMON, {
    variables: {
      offset: 1,
      take: 15,
    },
    onCompleted: (data) => {
      const pokemons = Object.values(data);
      pokemon.current = pokemons[0];
    },
  });

  //Query for get Pokemon BY NAME
  const [getPokemonsbyName, { loadingName, errorName, dataName }] =
    useLazyQuery(GET_POKEMON_DETAILS_NAME, {
      onCompleted: (dataName) => {
        let pokemonNameArray = Object.values(dataName);
        pokemonNameArray = pokemonNameArray[0];
        let newPokemonNameArray = new Array(pokemonNameArray);
        pokemon.current = newPokemonNameArray;
      },
    });
  //Query for Get Pokemon By DexNumber

  const [getPokemonsbyDexNumber, { loadingNumber, errorNumber, dataNumber }] =
    useLazyQuery(GET_POKEMON_DETAILS_DEX_NUMBER, {
      onCompleted: (dataNumber) => {
        let pokemonNameArray = Object.values(dataNumber);
        pokemonNameArray = pokemonNameArray[0];
        console.log("pokemonNameArray", pokemonNameArray);
        let newPokemonNameArray = new Array(pokemonNameArray);
        pokemon.current = newPokemonNameArray;
      },
    });

  const [getPokemonsbyAbility, { loadingAbility, errorAbility, dataAbility }] =
    useLazyQuery(GET_POKEMON_DETAILS_ABILITY, {
      fetchPolicy: "network-only",
      onCompleted: (dataAbility) => {
        let pokemonNameArray = Object.values(dataAbility);
        console.log(pokemonNameArray[0].pokemonThatHaveThisAbility);
        pokemonNameArray = pokemonNameArray[0].pokemonThatHaveThisAbility;
        pokemon.current = pokemonNameArray;
      },
    });

  let pokemonArray = pokemon.current;
  return (
    <div>
      <img className="navbar-log-image" src={Logo} />
      <div className="search-bars">
        <div className="search-bar1">
          <input
            className="search-input1"
            onChange={handleChangeName}
            placeholder="Search by name"
          />
          <div className="search-img-div">
            <img
              onClick={handleClickName}
              className="search-img1"
              src={SearchIcon1}
            />
          </div>
        </div>
        <div className="search-bar1 search-bar2">
          <input
            className="search-input1"
            onChange={handleChangeDexNumber}
            placeholder="Search By dexNumber"
          />
          <div className="search-img-div">
            <img
              className="search-img1"
              onClick={handleClickDexNumber}
              src={SearchIcon2}
            />
          </div>
        </div>
        <div className="search-bar1 search-bar3">
          <input
            className="search-input1"
            onChange={handleChangeAbility}
            placeholder="Search By Ability"
          />
          <div className="search-img-div">
            <img
              className="search-img1"
              onClick={handleClickAbility}
              src={SearchIcon2}
            />
          </div>
        </div>
      </div>
      {allPokemons.loading ? (
        <Box className="circular-progress-box">
          <CircularProgress
            style={{
              height: "100px",
              width: "100px",
            }}
            color="secondary"
          />
        </Box>
      ) : (
        <>
          <Box className="pokemon-cards">
            <Grid container spacing={4}>
              {pokemonArray.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      handlePokemonDetail(item);
                    }}
                  >
                    <Card item={item} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
};

export default Index;
