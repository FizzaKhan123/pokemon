import React, { useRef } from "react";
import { Grid, Box, Typography } from "@mui/material";
import "./index.css";
import Logo from "../../assets/images/black-logo3d.jpg";
import { GET_POKEMON_DETAIL } from "../gql/Query";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Index = () => {
  const pokemon = useRef();
  const params = useParams();
  const baseStats = useRef();
  const gender = useRef();
  const types = useRef();
  const loadingHook = useRef(true);
  const pokemonName = params.name;

  //Query for fetching detail of Pokemon
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: {
      pokemon: pokemonName,
    },

    onCompleted: (data) => {
      let pokemons = Object.values(data);
      pokemons = pokemons[0];
      console.log("uuuuuuuuu", pokemons);
      baseStats.current = pokemons.baseStats;
      gender.current = pokemons.gender;
      types.current = pokemons.types;
      pokemon.current = pokemons;
    },
  });

  const pokemonDetail = pokemon.current;
  let baseSt = baseStats.current;
  let gen = gender.current;
  let type = types.current;
  console.log("bas", baseSt);
  console.log("gen", gen);

  return (
    <div>
      <img className="logo-image" src={Logo} />
      {loading ? (
        <h1 style={{ color: "white" }}>loading</h1>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={5}>
              <Box className="entries">
                <Box className="parallel-entry">
                  <Box className="double-entry">
                    <Box className="single-entry">
                      <Typography className="single-entry-typo1">
                        Name :
                      </Typography>
                      <Typography className="single-entry-typo2">
                        {pokemonDetail.key}
                      </Typography>
                    </Box>
                    <Box className="single-entry">
                      <Typography className="single-entry-typo1">
                        Color:
                      </Typography>
                      <Typography className="single-entry-typo2">
                        {pokemonDetail.color}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="double-entry">
                    <Box className="single-entry">
                      <Typography className="single-entry-typo1">
                        Height:
                      </Typography>
                      <Typography className="single-entry-typo2">
                        {pokemonDetail.height}
                      </Typography>
                    </Box>
                    <Box className="single-entry">
                      <Typography className="single-entry-typo1">
                        Weight:
                      </Typography>
                      <Typography className="single-entry-typo2">
                        {pokemonDetail.weight}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="single-entry">
                  <Typography className="single-entry-typo1 gender">
                    Gender :
                  </Typography>
                  <Typography className="single-entry-typo2">
                    Female : {gen.female}
                  </Typography>
                  <Typography className="single-entry-typo2">
                    Male : {gen.male}
                  </Typography>
                </Box>
                <Typography className="single-entry-typo1-type">
                  Type
                </Typography>

                <div className="detail-pokemon-types">
                  {type.map(({ __typename, name }) => (
                    <div className="detail-type1">{name}</div>
                  ))}
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Box className="pokemon-image">
                <img
                  className="pokemon-detail-image"
                  src={pokemonDetail.backSprite}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Box className="baseStat-grid">
                <Box className="status-bars">
                  {/* 1 */}
                  <Box className="single-status-bar">
                    <Box className="baseStats-typos">
                      <Typography className="bar-property-name">
                        Attack
                      </Typography>
                      <Typography className="bar-property-value">
                        {baseSt.attack}
                      </Typography>
                    </Box>
                    <Box className="bar-1-realtive">
                      <Box className="bar-1-absolute"></Box>
                    </Box>
                  </Box>
                </Box>
                {/* 2 */}

                <Box className="single-status-bar">
                  <Box className="baseStats-typos">
                    <Typography className="bar-property-name">
                      Defense
                    </Typography>
                    <Typography className="bar-property-value">
                      {baseSt.defense}
                    </Typography>
                  </Box>

                  <Box className="bar-1-realtive">
                    <Box className="bar-2-absolute"></Box>
                  </Box>
                </Box>
                {/* 3 */}
                <Box className="single-status-bar">
                  <Box className="baseStats-typos">
                    <Typography className="bar-property-name">Hp</Typography>
                    <Typography className="bar-property-value">
                      {baseSt.hp}
                    </Typography>
                  </Box>
                  <Box className="bar-1-realtive">
                    <Box className="bar-3-absolute"></Box>
                  </Box>
                </Box>
                {/* 4 */}
                <Box className="single-status-bar">
                  <Box className="baseStats-typos">
                    <Typography className="bar-property-name">
                      Specail Attack
                    </Typography>
                    <Typography className="bar-property-value">
                      {baseSt.specialattack}
                    </Typography>
                  </Box>
                  <Box className="bar-1-realtive">
                    <Box className="bar-4-absolute"></Box>
                  </Box>
                </Box>
                {/* 5 */}
                <Box className="single-status-bar">
                  <Box className="baseStats-typos">
                    <Typography className="bar-property-name">
                      Special Defense
                    </Typography>
                    <Typography className="bar-property-value">
                      {baseSt.specialdefense}
                    </Typography>
                  </Box>
                  <Box className="bar-1-realtive">
                    <Box className="bar-5-absolute"></Box>
                  </Box>
                </Box>
                {/* 6 */}
                <Box className="single-status-bar">
                  <Box className="baseStats-typos">
                    <Typography className="bar-property-name">Speed</Typography>
                    <Typography className="bar-property-value">
                      {baseSt.speed}
                    </Typography>
                  </Box>
                  <Box className="bar-1-realtive">
                    <Box className="bar-6-absolute"></Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Index;
