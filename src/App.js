import { Container } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
// import { ptBR } from '@material-ui/core/locale';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';

import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarcas';


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


// const muiTheme = createMuiTheme({
//   palette: {
//     primary: {
//       main: blue[900],
//     }
//   },
// }, ptBR);

// const useStyles = makeStyles((theme) => ({
//   // root: {
//   //   display: 'flex',
//   // },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
// }));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List >
          <ListItem button >
            <ListItemText primary="Marcas" />
          </ListItem>
          <ListItem button >
            <ListItemText primary="Veiculos" />
          </ListItem>
          <ListItem button >
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem button >
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>


      </Drawer>

        <Container component="article" maxWidth="md">
          <Switch>
            <Route path="/cadastro-marca">
              <CadastroMarca></CadastroMarca>
            </Route>
            <Route path='/alteracao-marca/:id'>
              <CadastroMarca></CadastroMarca>
            </Route>
            <Route path="/">
              <ListagemMarcas></ListagemMarcas>
            </Route>
          </Switch>
        </Container>
    </div>



    // <div className={classes.root}>
    //   <CssBaseline />
    //   <main className={classes.content}>
    //     <div className={classes.toolbar} />
    //     <Container component="article" maxWidth="md">
    //       <Switch>
    //         <Route path="/cadastro-marca">
    //           <CadastroMarca></CadastroMarca>
    //         </Route>
    //         <Route path='/alteracao-marca/:id'>
    //           <CadastroMarca></CadastroMarca>
    //         </Route>
    //         <Route path="/">
    //           <ListagemMarcas></ListagemMarcas>
    //         </Route>
    //       </Switch>
    //     </Container>
    //   </main>
    // </div>
  );
}

export default App;
