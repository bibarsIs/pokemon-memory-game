import React from 'react';
import PokemonCard from "./PokemonCard";
import styled from "styled-components";
import {useState} from "react";

const CardsGrid = ({pokemons, increaseCurrentScore, resetCurrentScore}) => {

    const [clickedPokemons, setClickedPokemons] = useState(new Set())

    const pokemonsCards = pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} handleCardClick={handleCardClick}/>
    ))

    function handleCardClick(pokemonId) {
        if (!clickedPokemons.has(pokemonId)){
            setClickedPokemons(prev => prev.add(pokemonId))
            increaseCurrentScore()
        } else {
            resetCurrentScore()
            setClickedPokemons(new Set())
        }
    }

    return (
        <Grid>
            {pokemonsCards}
        </Grid>
    );
};

const Grid = styled.div`
  padding-top: 20px;
  margin: 0 40px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 690px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 20px;
  }
`

export default CardsGrid;
