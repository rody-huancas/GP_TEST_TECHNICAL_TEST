import { People } from "@/data";
import { Person } from "@/models";
import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { addFavorite, addPeople } from "@/redux/states";
import store from "@/redux/store";

export interface HomeProps {
  // types...
}

const Home: React.FC<HomeProps> = ({}) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const pageSize = 5;
  const dispatch = useDispatch()

  const findPerson = (person: Person) => !!favoritePeople.find(p => p.id === person.id);
  const filterPerson = (person: Person) => favoritePeople.filter(p => p.id !== person.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person]; 
    dispatch(addFavorite(filterPerson))
    setSelectedPeople( filteredPeople );
  };

  const columns = [
    {
      field: "actions",
      sortable: false,
      headerName: "",
      flex: 1,
      minWidth: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Checkbox
            size="small"
            checked={findPerson(params.row)}
            onChange={() => handleChange(params.row)}
          />
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  useEffect(() => {
    dispatch(addPeople(People));
  }, [])
  

  return (
    <DataGrid
      rows={store.getState().people}
      columns={columns}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: pageSize } },
      }}
      getRowId={(row: any) => row.id}
    />
  );
};

export default Home;
