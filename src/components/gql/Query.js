import { gql } from "@apollo/client";
const name = "houndoom";

export const GET_All_POKEMON = gql`
  query FEED($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      key
      backSprite
      types {
        name
      }
    }
  }
`;

export const GET_POKEMON_DETAILS_NAME = gql`
  query GET_POKEMON($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      key
      backSprite
      types {
        name
      }
    }
  }
`;

export const GET_POKEMON_DETAILS_DEX_NUMBER = gql`
  query GET_POKEMON_BY_DEX($number: Int!) {
    getPokemonByDexNumber(number: $number) {
      key
      backSprite
      types {
        name
      }
    }
  }
`;

export const GET_POKEMON_DETAILS_ABILITY = gql`
  query GET_POKEMON_BY_ABILITY($ability: AbilitiesEnum!) {
    getAbility(ability: $ability) {
      pokemonThatHaveThisAbility {
        key
        backSprite
        types {
          name
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAIL = gql`
  query GET_POKEMON($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      key
      backSprite
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      color
      gender {
        female
        male
      }
      height

      types {
        name
      }
      weight
    }
  }
`;
