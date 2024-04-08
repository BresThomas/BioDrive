import PropTypes from 'prop-types';
import { useState } from 'react'; // Import useState hook

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

PostSearch.propTypes = {
  posts: PropTypes.array.isRequired,
  onChange: PropTypes.func, // Prop to pass selected value to parent component
};

export default function PostSearch({ posts, onChange }) {

  const handlePostChange = (event, newValue) => {
    onChange(newValue); // Pass selected value to parent component
  };

  return (
    <Autocomplete
      onChange={handlePostChange} // Call handleProductChange on value change
      fullWidth
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
          },
        },
      }}
      options={posts}
      getOptionLabel={(product) => product.nom}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Produit"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
