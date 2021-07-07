import './App.sass';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import CreateUser from './pages/user/create/CreateUser';
import VehiclePage from './pages/vehicle/VehiclePage';
import CreateVehicle from './pages/vehicle/create/CreateVehicle';
import BrandPage from './pages/brand/BrandPage';
import CreateBrand from './pages/brand/create/CreateBrand';
import Page404 from './pages/page404/Page404';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import Sidebar from './components/sidebar/Sidebar';

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
}));

function App({ window }) {
  const [pageTitle, setPageTitle] = useState('');

  function WithTitle({ title, component: Component }) {
    useEffect(() => setPageTitle(title), [title]);
    return (
      <Component />
    );
  }

  function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated, validateUserToken } = useContext(AuthContext);

    const token = localStorage.getItem('token');

    useEffect(() => {
      validateUserToken(token);
    }, [token, validateUserToken]);

    if (isPrivate && !authenticated) {
      return <Redirect to="/login" />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} />;
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AlertProvider>
        <AuthProvider>
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
                <Sidebar> </Sidebar>
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
                <Sidebar> </Sidebar>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="md">
              <Switch>
                <Route exact path="/" />
                <CustomRoute
                  isPrivate
                  exact
                  path="/dashboard"
                  component={() => (
                    <WithTitle title="Dashboard" component={DashboardPage} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  exact
                  path="/marcas"
                  component={() => (
                    <WithTitle title="Marcas" component={BrandPage} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  exact
                  path="/marcas/novo"
                  component={() => (
                    <WithTitle title="Criar Marca" component={CreateBrand} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  path="/marcas/editar/:id"
                  component={() => (
                    <WithTitle title="Editar Marca" component={CreateBrand} />
                  )}
                />
                <CustomRoute
                  exact
                  path="/veiculos"
                  component={() => (
                    <WithTitle title="Veículos" component={VehiclePage} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  path="/veiculos/novo"
                  component={() => (
                    <WithTitle title="Criar Veículo" component={CreateVehicle} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  path="/veiculos/editar/:id"
                  component={() => (
                    <WithTitle title="Editar Veículo" component={CreateVehicle} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  exact
                  path="/usuarios"
                  component={() => (
                    <WithTitle title="Usuários" component={UserPage} />
                  )}
                />
                <CustomRoute
                  isPrivate
                  path="/usuarios/novo"
                  component={() => (
                    <WithTitle title="Criar Usuário" component={CreateUser} />
                  )}
                />
                <CustomRoute
                  isPrivate
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
        </AuthProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
