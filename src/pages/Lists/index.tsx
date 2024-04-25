import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PokeTable } from "../../components";
import { ColumnDefinition, PokemonsList } from "types";
import { useGetPokemonsQuery } from "../../api/index";

import "./styles.css";

const Lists = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();

  const {
    data: pokemonList,
    error,
    isLoading,
  } = useGetPokemonsQuery<PokemonsList>(pageIndex);

  const handleRedirection = (url: string) => {
    const parts = url.split("/");
    const id = parts[parts.length - 2];
    navigate(`/pokemon/${id}`);
  };

  const columns: ColumnDefinition[] = [
    {
      accessorKey: "name",
      Header: "Name",
      cell: (info: any) => (
        <div
          className="poke"
          onClick={() => handleRedirection(info.cell.row.original.url)}
        >
          {info.getValue()}
        </div>
      ),
      footer: (props) => props.column.id,
    },
  ];

  const fetchData = (index: number) => {
    setPageIndex(index);
  };

  if (isLoading) {
    return <div className="message">Loading...</div>;
  }

  if (error) {
    return <div className="message">Error...</div>;
  }

  return (
    <div className="poke-container">
      <div className="heading">Poke React</div>

      <PokeTable
        data={pokemonList?.results || []}
        columns={columns}
        count={pokemonList?.count || 0}
        fetchData={fetchData}
        page={pageIndex}
      />
    </div>
  );
};

export default Lists;
