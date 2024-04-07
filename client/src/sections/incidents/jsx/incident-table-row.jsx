import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../../components/label';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function IncidentTableRow({
  id,
  gravite,
  date,
  intitule,
  description,
  selected
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const handleDeleteIncident = async (id_incident) => {
    setOpen(null);
  
    const response = await fetch(`http://localhost:3001/api/deleteIncident/${id_incident}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    if (response.ok) {
      console.log("Suppression réussie !");
      window.location.reload(true);
    } else {
      console.error("Erreur lors de la suppression de l'incident");
    }
  };
  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>

        <TableCell>{id}</TableCell>

        <TableCell>{intitule}</TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>{gravite}</TableCell>
        
        <TableCell align="center">{date}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDeleteIncident(id)} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

      </Popover>
    </>
  );
}

IncidentTableRow.propTypes = {
  id: PropTypes.any,
  gravite: PropTypes.any,
  date: PropTypes.any,
  intitule: PropTypes.any,
  description: PropTypes.any,
  selected: PropTypes.any
};
