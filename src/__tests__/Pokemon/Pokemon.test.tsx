import { render, screen } from "@testing-library/react";
import Pokemon from "pages/Pokemon";
import { PokemonQuery, PokemonType } from "../../types";
import { useGetPokemonByIdQuery } from "../../api/index";

jest.mock("../../api/index");

describe("Pokemon Component", () => {
  const mockLoadingData: PokemonQuery = {
    data: undefined,
    isLoading: true,
    isError: false,
  };

  const mockErrorData: PokemonQuery = {
    data: undefined,
    isLoading: false,
    isError: true,
  };

  const mockPokemonData: PokemonType = {
    name: "Pikachu",
    weight: "10",
    height: "5",
    types: [{ type: { name: "Electric" } }],
    sprites: { front_default: "some/image/url" },
  };

  const mockSuccessData: PokemonQuery = {
    data: mockPokemonData,
    isLoading: false,
    isError: false,
  };

  beforeEach(() => {
    (useGetPokemonByIdQuery as jest.Mock).mockReset();
  });

  test("renders loading message while fetching data", async () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockLoadingData);

    render(<Pokemon />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error message if data fetching fails", async () => {
    const mockErrorMessage = "Error fetching Pokémon details.";

    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockErrorData);

    render(<Pokemon />);

    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
  });

  test("renders Pokemon details when data is fetched successfully", async () => {
    (useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockSuccessData);

    render(<Pokemon />);

    const { name, weight, height, types } = mockPokemonData;

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByAltText(name)).toBeInTheDocument();
    expect(screen.getByText(height)).toBeInTheDocument();
    expect(screen.getByText(weight)).toBeInTheDocument();
    expect(screen.getByText(types[0].type.name)).toBeInTheDocument();
  });
});
