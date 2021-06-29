import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const CustomModal = ({ disabled, remove }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button disabled={disabled} variant="outlined" color="secondary" className="action-item" onClick={handleOpen}>
        Excluir
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <h2>Confirmar remoção?</h2>
          <div className="action-itens">
            <Button
              className="action-item"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              className="action-item"
              variant="outlined"
              color="primary"
              onClick={remove}
            >
              Sim
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;
