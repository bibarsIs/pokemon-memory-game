import React from 'react';
import CardsGrid from "./CardsGrid";
import {useEffect, useState} from 'react';
import styled from "styled-components";

const GameBoard = () => {
    const POKEMONS_AMOUNT = 12
    const POKEMONS_LIMIT = 151

    const [pokemons, setPokemons] = useState([])
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(currentScore)

    useEffect(() => {
        (async () => {
            setPokemons(await fetchPokemons())
        })()
    }, [])


    async function fetchPokemons() {
        const randomNumbers = shuffleArray(Array.from({length: POKEMONS_LIMIT}, (_, i) => i + 1))   // shuffled numbers from 1 to 151
        const pokemonIds = randomNumbers.slice(0, POKEMONS_AMOUNT)  // get first 12
        const fetchedPokemons = []
        await Promise.all(pokemonIds.map(async (pokemonId) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            const pokemon = await res.json()

            const id = pokemon["id"]
            const name = pokemon["name"]
            const image = pokemon["sprites"]["other"]["official-artwork"]["front_default"]

            fetchedPokemons.push({id, name, image})
        }))
        return fetchedPokemons

    }

    function increaseCurrentScore() {
        const nextScore = currentScore + 1
        setCurrentScore(nextScore)
        if (nextScore > bestScore) {
            setBestScore(nextScore)
        }
        setPokemons(prev => shuffleArray(prev))
    }

    async function resetCurrentScore() {
        alert('Game over')
        setCurrentScore(0)
        setPokemons(await fetchPokemons())
    }


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    return (
        <div>
            <ScoreBoard>
                <CurrentScore>Current score: {currentScore}</CurrentScore>
                <BestScore>Best score: {bestScore}</BestScore>
            </ScoreBoard>
            <CardsGrid pokemons={pokemons}
                       increaseCurrentScore={increaseCurrentScore}
                       resetCurrentScore={resetCurrentScore}/>
        </div>
    );
};

const ScoreBoard = styled.div`

`

const CurrentScore = styled.div`

`

const BestScore = styled.div`

`

export default GameBoard
