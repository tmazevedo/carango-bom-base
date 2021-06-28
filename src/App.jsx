import './App.sass';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Route, Switch, Link } from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import CreateUser from './pages/user/create/CreateUser';
import VehiclePage from './pages/vehicle/VehiclePage';
import CreateVehicle from './pages/vehicle/create/CreateVehicle';
import BrandPage from './pages/brand/BrandPage';
import CreateBrand from './pages/brand/create/CreateBrand';
import Page404 from './pages/page404/Page404';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

// eslint-disable-next-line react/prop-types
function App({ window }) {
  const [pageTitle, setPageTitle] = useState('');

  function WithTitle({ title, component: Component }) {
    useEffect(() => setPageTitle(title));
    return (
      <Component />
    );
  }

  WithTitle.propTypes = {
    title: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
  };

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Entrar" />
          <Link className={classes.menuLink} to="/login" />
        </ListItem>

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
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container component="article" maxWidth="md">
          <Switch>
            <Route exact path="/" />
            <Route
              exact
              path="/dashboard"
              component={() => (
                <WithTitle title="Dashboard" component={DashboardPage} />
              )}
            />
            <Route
              exact
              path="/marcas"
              component={() => (
                <WithTitle title="Marcas" component={BrandPage} />
              )}
            />
            <Route
              exact
              path="/marcas/novo"
              component={() => (
                <WithTitle title="Criar Marca" component={CreateBrand} />
              )}
            />
            <Route
              path="/marcas/editar/:id"
              component={() => (
                <WithTitle title="Editar Marca" component={CreateBrand} />
              )}
            />
            <Route
              exact
              path="/veiculos"
              component={() => (
                <WithTitle title="Veículos" component={VehiclePage} />
              )}
            />
            <Route
              path="/veiculos/novo"
              component={() => (
                <WithTitle title="Criar Veículo" component={CreateVehicle} />
              )}
            />
            <Route
              path="/veiculos/editar/:id"
              component={() => (
                <WithTitle title="Editar Veículo" component={CreateVehicle} />
              )}
            />
            <Route
              exact
              path="/usuarios"
              component={() => (
                <WithTitle title="Usuários" component={UserPage} />
              )}
            />
            <Route
              path="/usuarios/novo"
              component={() => (
                <WithTitle title="Criar Usuário" component={CreateUser} />
              )}
            />
            <Route
              path="/usuarios/editar/:id"
              component={() => (
                <WithTitle title="Editar Usuário" component={CreateUser} />
              )}
            />
            <Route
              path="/login"
              component={() => (
                <WithTitle title="Login" component={LoginPage} />
              )}
            />
            <Route path="/recuperar-senha" />
            <Route
              component={() => (
                <WithTitle title="Página não encontrada" component={Page404} />
              )}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
