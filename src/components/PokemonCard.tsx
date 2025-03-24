import React from 'react';
import { PokemonBasic } from '../types/pokemon';
import { extractIdFromUrl } from '../utils/helpers';
import '../styles/Pokemon.css';

interface Props {
    pokemon: PokemonBasic;
    onClick: (id: number) => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, onClick }) => {
    const id = extractIdFromUrl(pokemon.url);

    return (
        <div className="pokemon-card" onClick={() => onClick(id)}>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={pokemon.name}
                className="pokemon-image"
            />
            <div className="pokemon-info">
                <h3>{pokemon.name}</h3>
                <span>#{id.toString().padStart(3, '0')}</span>
            </div>
        </div>
    );
};

export default PokemonCard;