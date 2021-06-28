import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const DashboardPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box bgcolor="info.main" color="info.contrastText" p={2}>
        <strong>485</strong>
        {' '}
        veículos encontrados
      </Box>

      <div style={{ padding: '0 12px', margin: '40px 0' }}>
        <Grid container spacing={5}>
          <Grid container item lg={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Hyundai
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  47 veículos
                </Typography>
                <Typography variant="body2" component="p">
                  R$ 249.300,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item lg={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Fiat
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  5 veículos
                </Typography>
                <Typography variant="body2" component="p">
                  R$ 90.000,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item lg={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Volkswagen
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  985 veículos
                </Typography>
                <Typography variant="body2" component="p">
                  R$ 559.580,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid container item md={4}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Renault
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  11 veículos
                </Typography>
                <Typography variant="body2" component="p">
                  R$ 99.000,00
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DashboardPage;
