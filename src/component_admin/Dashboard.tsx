
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Chart from './Chart';
import DataTable from './DataTable';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  return (
    <><div  className='mb-5'></div>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Item>
          <Typography variant="h6">Utilisateurs actifs</Typography>
          <Chart type="pie" />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Item>
          <Typography variant="h6">Ventes mensuelles</Typography>
          <Chart type="line" />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Item>
          <Typography variant="h6">Tâches complétées</Typography>
          <Chart type="bar" />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Typography variant="h6">Tableau des données</Typography>
          <DataTable />
        </Item>
      </Grid>
    </Grid>
    </>
  );
}

export default Dashboard;
