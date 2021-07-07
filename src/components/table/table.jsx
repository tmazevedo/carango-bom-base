import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link, BrowserRouter, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CustomModal from '../modal/CustomModal';

function Table({
  fields, columns, routeToChange, remove,
}) {
  const [listFields, setListFields] = useState([]);
  const [lineSelected, setLineSelected] = useState();
  const history = useHistory();

  useEffect(() => {
    setListFields(fields);
  });

  return (
    <>
      <DataGrid
        hideFooter="true"
        rows={listFields}
        columns={columns}
        onRowSelected={(gridSelection) => setLineSelected(gridSelection.data)}
      />

      <div className="action-itens">
        <CustomModal disabled={!lineSelected} item={lineSelected?.id} remove={remove} />
        <BrowserRouter>
          <Link
            className={lineSelected ? 'link' : 'link link-disabled'}
            to={routeToChange + lineSelected?.id}
          >
            <Button
              disabled={!lineSelected}
              className="action-item"
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push(routeToChange + lineSelected?.id);
              }}
            >
              Alterar
            </Button>
          </Link>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Table;
