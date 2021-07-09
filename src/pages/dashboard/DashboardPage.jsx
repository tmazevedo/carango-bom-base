import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DashboardService from '../../services/DashboardService';

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
  const [dashboardList, setDashboardList] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const dashboard = await DashboardService.List();
      setDashboardList(dashboard);

      let carsQuantity = 0;
      dashboard.forEach((element) => { carsQuantity += element.count; });
      setTotalCars(carsQuantity);

      setLoading(false);
    }

    fetchData();
  }, []);

  const classes = useStyles();

  return (
    loading ? <CircularProgress />
      : (
        <>
          <Box bgcolor="info.main" color="info.contrastText" p={2}>
            <strong>{totalCars}</strong>
            {' '}
            veículos encontrados
          </Box>

          <div style={{ padding: '0 12px', margin: '40px 0' }}>

            <Grid container spacing={5}>
              {
                dashboardList.map((value) => (
                  <Grid container item lg={4} key={`${value.brand}-grid`}>
                    <Card className={classes.root} variant="outlined">
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {value.brand}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {value.count}
                        </Typography>
                        <Typography variant="body2" component="p">
                          R$
                          {value.totalPrice}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </div>
        </>
      )
  );
};

export default DashboardPage;
