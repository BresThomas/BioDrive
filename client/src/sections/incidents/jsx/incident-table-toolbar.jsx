import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName, title }) {
  return (
    <Toolbar
    sx={{
      height: 96,
      display: 'flex',
      justifyContent: 'space-between',
      p: (theme) => theme.spacing(0, 1, 0, 3),
      ...(numSelected > 0 && {
        color: 'primary.main',
        bgcolor: 'primary.lighter',
      }),
    }}
    >
    {/* <Stack direction="row"> */}
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end">
      <Typography variant="h4" pr={5}>{title} </Typography>
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder="Search incident..."
        startAdornment={
          <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
            </InputAdornment>
          }
          />
          )}
      </Stack>

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  title: PropTypes.func,
};
