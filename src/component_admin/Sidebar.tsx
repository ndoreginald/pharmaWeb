import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/admin' },
  
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/userList' },
  { text: 'Categorie', icon: <FolderIcon />, path: '/admin/categories' },
  { text: 'Produits', icon: <BarChartIcon />, path: '/admin/products' },
  { text: 'Ajouter Categorie', icon: <ListAltIcon />, path: '/admin/categorieForm' },
  { text: 'Ajouter Produit', icon: <ListAltIcon />, path: '/admin/AddProduct' },
  { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  // Ajoutez d'autres éléments de menu ici si nécessaire
];

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
    <List component="nav">
      {menuItems.map((item, index) => (
        <ListItem button component={Link} to={item.path} key={index}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
