
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Chart from './Chart';
import DataTable from './DataTable';
import BarChart from './BarChart';
import MonthlySalesChart from './MonthlySalesChart';

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
          <Typography variant="h6">Paiements les plus effectués</Typography>
          <Chart type="pie" />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Item>
          <Typography variant="h6">Commandes en temps réel</Typography>
          <Chart type="line" />
        </Item>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Item>
          <Typography variant="h6">Commandes effectuées</Typography>
          <Chart type="bar" />
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item>
          <Typography variant="h6">Produits les plus vendus</Typography>
          <BarChart /><br /><br />
        </Item>
      </Grid>
      
      <Grid item xs={12}>
        <Item>
          <Typography variant="h6">Ventes mensuelles</Typography>
          <MonthlySalesChart />
          <br />
        </Item>
      </Grid>
    </Grid>
    </>
  );
}

export default Dashboard;
