import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Iconify from '../../components/iconify';

PostSearch.propTypes = {
  posts: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired, // Add onChange prop
};

export default function PostSearch({ posts, onChange }) {
  return (
    <Autocomplete
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
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={onChange}
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
