import { render, screen } from "@testing-library/react";
import PokeTable from "components/PokeTable";
import { ColumnDefinition } from "../../types";

const columns: ColumnDefinition[] = [
  {
    accessorKey: "name",
    Header: "Name",
    cell: (info: any) => {
      return <div className="poke">{info.getValue()} </div>;
    },
    footer: (props) => props.column.id,
  },
];

const data = [
  { id: 1, name: "Pikachu", url: "some/url" },
  { id: 2, name: "Bulbasaur", url: "some/other/url" },
];

describe("PokeTable Component", () => {
  const count = 2;
  const fetchData = jest.fn();
  const page = 0;

  beforeEach(() => {
    render(
      <PokeTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
      />
    );
  });

  test("renders table with provided data", () => {
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  test("calls fetchData function when table is rendered", () => {
    expect(fetchData).toHaveBeenCalledWith(page);
  });

  test("renders pagination controls", () => {
    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  test("disables pagination buttons based on page count", () => {
    expect(screen.getByText("<")).toBeDisabled();
    expect(screen.getByText("<<")).toBeDisabled();
  });
});
