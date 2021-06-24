import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { Route, Switch, Link } from "react-router-dom";
import "./App.scss";
import UserPage from "../src/pages/user/UserPage";
import { useHistory } from "react-router";
import CreateUserComponent from "./pages/user/createUser/createUser";
import VehiclePage from "./pages/vehicle/VehiclePage";
import CreateVehicleComponent from "./pages/vehicle/createVehicleComponent/createVehicleComponent";
import BrandPage from "./pages/brand/BrandPage";
import CreateBrand from "./pages/brand/createBrand/createBrand";
import Page404 from "./pages/page404/Page404";
import DashboardPage from "./pages/dashboard/DashboardPage";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
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

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  function vehiclePage() {
    history.push("/vehiclePage");
  }

  function userPage() {
    history.push("/userPage");
  }

  function brandPage() {
    history.push("/brandPage");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {/* <ListItem button onClick={() => brandPage()}>
          <ListItemText primary="Marcas" />
        </ListItem>
        <ListItem button onClick={() => vehiclePage()}>
          <ListItemText primary="Veículos" />
        </ListItem>
        <ListItem button onClick={() => userPage()}>
          <ListItemText primary="Usuários" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Dashboard" />
        </ListItem> */}

        <Link to="/marcas">
          <ListItem button>
            <ListItemText primary="Marcas" />
          </ListItem>
        </Link>

        <Link to="/veiculos">
          <ListItem button>
            <ListItemText primary="Veículos" />
          </ListItem>
        </Link>

        <Link to="/usuarios">
          <ListItem button>
            <ListItemText primary="Usuários" />
          </ListItem>
        </Link>

        <Link to="/dashboard">
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            Carango Bom
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
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
            <Route exact path="/">
              <DashboardPage></DashboardPage>
            </Route>
            <Route path="/marcas">
              <BrandPage></BrandPage>
            </Route>
            <Route path="/marcas/novo">
              <CreateBrand></CreateBrand>
            </Route>
            <Route path="/veiculos">
              <VehiclePage></VehiclePage>
            </Route>
            <Route path="/veiculos/novo">
              <CreateVehicleComponent></CreateVehicleComponent>
            </Route>
            <Route path="/veiculos/editar/:id">
              <CreateVehicleComponent></CreateVehicleComponent>
            </Route>
            <Route path="/usuarios">
              <UserPage></UserPage>
            </Route>
            <Route path="/usuarios/novo">
              <CreateUserComponent></CreateUserComponent>
            </Route>
            <Route>
              <Page404></Page404>
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
