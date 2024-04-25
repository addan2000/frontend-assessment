import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Lists from 'pages/Lists';
import { PokemonData, PokemonsList } from '../../types';
import { useGetPokemonsQuery } from '../../api/index';

jest.mock('../../api/index');

describe('Lists Component', () => {
  const mockPokemons: PokemonData[] = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
    { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
  ];

  const mockDataLoading: PokemonsList = {
    data: { results: [], count: 0 },
    error: false,
    isLoading: true,
  };

  const mockDataError: PokemonsList = {
    data: { results: [], count: 0 },
    error: true,
    isLoading: false,
  };

  const mockDataSuccess: PokemonsList = {
    data: { results: mockPokemons, count: mockPokemons.length },
    error: false,
    isLoading: false,
  };

  beforeEach(() => {
    (useGetPokemonsQuery as jest.Mock).mockReset();
  });

  test('renders loading message while fetching data', async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue(mockDataLoading);

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message if data fetching fails', async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue(mockDataError);

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    );

    expect(screen.getByText('Error...')).toBeInTheDocument();
  });

  test('renders list of pokemons', async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue(mockDataSuccess);

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    );

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  test('redirects to correct pokemon page when clicked', async () => {
    (useGetPokemonsQuery as jest.Mock).mockReturnValue(mockDataSuccess);

    render(
      <MemoryRouter>
        <Lists />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Pikachu'));

    expect(window.location.href).toEqual(mockPokemons[0].url); // Assuming it redirects to the pokemon URL
  });
});
