import React from 'react';
import styled from "styled-components";

function PokemonCard({pokemon, handleCardClick}) {
    return (
        <Card onClick={() => handleCardClick(pokemon.id)}>
            <img src={pokemon.image} alt={pokemon.name} width={100} height={100}/>
            <PokemonName>{pokemon.name}</PokemonName>
        </Card>
    );
}

const Card = styled.figure`
  all: unset;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  cursor: pointer;
  user-select: none;
  padding: 40px 20px 20px 20px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  border-radius: 10px;
  font-weight: bold;
  transition: transform 0.2s ease-out;
  &:hover {
    transform: scale(1.1);
  }
`

const PokemonName = styled.figcaption`
  text-transform: capitalize;
`

export default PokemonCard;
