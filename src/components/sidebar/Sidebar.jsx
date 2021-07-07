import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { authenticated, handleLogout } = useContext(AuthContext);

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List hidden={authenticated}>
        <ListItem button>
          <ListItemText primary="Entrar" />
          <Link className={classes.menuLink} to="/login" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Veículos" />
          <Link className={classes.menuLink} to="/veiculos" />
        </ListItem>
      </List>

      <List hidden={!authenticated}>
        <ListItem button>
          <ListItemText primary="Marcas" />
          <Link className={classes.menuLink} to="/marcas" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Veículos" />
          <Link className={classes.menuLink} to="/veiculos" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Usuários" />
          <Link className={classes.menuLink} to="/usuarios" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Dashboard" />
          <Link className={classes.menuLink} to="/dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemText primary="Sair" onClick={handleLogout} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
