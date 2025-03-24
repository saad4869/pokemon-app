import React, { useState, useEffect, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import { fetchPokemonList, fetchPokemonDetails } from '../api/pokemonApi';
import { PokemonBasic, Pokemon, PokemonListResponse } from '../types/pokemon';
import '../styles/Pokemon.css';

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonBasic[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const loadPokemon = useCallback(async (url?: string) => {
        try {
            setLoading(true);
            let data: PokemonListResponse;

            if (url) {
                // Extract offset and limit from URL
                const urlObj = new URL(url);
                const offset = urlObj.searchParams.get('offset') || '0';
                const limit = urlObj.searchParams.get('limit') || '20';
                data = await fetchPokemonList(parseInt(offset), parseInt(limit));
            } else {
                data = await fetchPokemonList(0, 20);
            }

            setPokemonList(prev => [...prev, ...data.results]);
            setNextUrl(data.next);
        } catch (err) {
            setError('Failed to load Pokémon');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadPokemon();
    }, [loadPokemon]);

    // Handle scroll for infinite loading
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100 &&
                !loading &&
                nextUrl
            ) {
                loadPokemon(nextUrl);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, nextUrl, loadPokemon]);

    const handlePokemonClick = async (id: number) => {
        try {
            const pokemon = await fetchPokemonDetails(id);
            setSelectedPokemon(pokemon);
        } catch (err) {
            console.error('Failed to load Pokémon details', err);
        }
    };

    const closeModal = () => {
        setSelectedPokemon(null);
    };

    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="pokemon-container">
            <div className="pokemon-grid">
                {pokemonList.map(pokemon => (
                    <PokemonCard
                        key={pokemon.name}
                        pokemon={pokemon}
                        onClick={handlePokemonClick}
                    />
                ))}
            </div>

            {loading && <div className="loading">Loading...</div>}

            {selectedPokemon && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>×</button>
                        <h2>{selectedPokemon.name}</h2>
                        <img
                            src={selectedPokemon.sprites.other['official-artwork'].front_default}
                            alt={selectedPokemon.name}
                            className="modal-image"
                        />
                        <div className="pokemon-types">
                            {selectedPokemon.types.map(({ type }) => (
                                <span key={type.name} className={`type ${type.name}`}>
                  {type.name}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonList;