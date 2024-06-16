
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../component_admin/Header';
import Sidebar from '../component_admin/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Alice Dupont', 'admin', 'password123', 'alice.dupont@example.com', '0123456789'),
  createData('Bob Martin', 'user',  'securepass456', 'bob.martin@example.com','0987654321'),
  createData('Caroline Dubois', 'moderator',  'mysecret789', 'caroline.dubois@example.com','0123987654'),
  createData('David Lefevre', 'user',  'passw0rd','david.lefevre@example.com', '0176543210'),
  createData('Evelyne Bernard', 'admin',  'evelyne2023', 'evelyne.bernard@example.com','0192837465'),
];


function Users () {

    const theme = createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
        },
      });

      const handleEdit = (row: { name: string; calories: number; fat: number; carbs: number; protein: number; }) => {
        // Logic for editing a row
        console.log('Edit row:', row);
      };
    
      const handleDelete = (row: { name: string; calories: number; fat: number; carbs: number; protein: number; }) => {
        // Logic for deleting a row
        console.log('Delete row:', row);
      };
 
    return (
      <>
        
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App" style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Header />
          <div  className='mb-5'></div>
          <Typography variant="h6" className='text-center'>Tableau des utilisateurs</Typography>
          <div  className='mb-5'></div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='bg-primary'>
            <TableCell sx={{  fontSize: '1rem'}}>nom </TableCell>
            <TableCell sx={{  fontSize: '1rem'}} align="right">role</TableCell>
            <TableCell sx={{  fontSize: '1rem'}} align="right">password&nbsp;</TableCell>
            <TableCell sx={{  fontSize: '1rem'}} align="right">email&nbsp;</TableCell>
            <TableCell sx={{  fontSize: '1rem'}} align="right">telephone&nbsp;</TableCell>
            <TableCell sx={{  fontSize: '1rem'}} align="right">Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEdit(row)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </main>
      </div>
    </ThemeProvider>
      </>
    )
  
}

export default Users
