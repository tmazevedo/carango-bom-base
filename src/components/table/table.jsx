import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Link, BrowserRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
// import CustomModal from '../modal/CustomModal';

function Table({ fields, colunas, routeToChange, remove }) {

    const [listFields] = useState(fields);
    const [lineSelected, setLineSelected] = useState();

    return (
        <>
            <DataGrid
                hideFooter="true"
                rows={listFields}
                columns={colunas}
                onRowSelected={(gridSelection) => setLineSelected(gridSelection.data)}
            />

            <div className="action-itens">
                {/* <CustomModal /> */}
                <Button
                    className="action-item"
                    variant="outlined"
                    color="secondary"
                    disabled={!lineSelected}
                    onClick={() => remove}
                >
                    Excluir
                </Button>

                {
                    lineSelected
                    && (
                        <BrowserRouter>
                            <Link className="link" to={routeToChange + lineSelected?.id}>
                                <Button
                                    className="action-item"
                                    variant="outlined"
                                    color="primary"
                                >
                                    Alterar
                                </Button>
                            </Link>
                        </BrowserRouter>
                    )
                }
            </div>
        </>
    );
}

export default Table;
