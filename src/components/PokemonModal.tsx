import React from 'react';
import { Pokemon } from '../types/pokemon';
import '../styles/Pokemon.css';

interface Props {
    pokemon: Pokemon | null;
    onClose: () => void;
}

const PokemonModal: React.FC<Props> = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{pokemon.name}</h2>
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="modal-image"
                />
                <div className="pokemon-types">
                    {pokemon.types.map(({ type }) => (
                        <span key={type.name} className={`type ${type.name}`}>
              {type.name}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;