import React from 'react';
import PokemonList from './components/PokemonList';
import './styles/Pokemon.css';

function App() {
  return (
      <div className="App">
        <header className="app-header">
          <h1>Pokédex</h1>
        </header>
        <main>
          <PokemonList />
        </main>
      </div>
  );
}

export default App;