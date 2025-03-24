import axios from 'axios';
import { PokemonListResponse, Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset = 0, limit = 20): Promise<PokemonListResponse> => {
    const response = await axios.get(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
};

export const fetchPokemonDetails = async (id: string | number): Promise<Pokemon> => {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
};