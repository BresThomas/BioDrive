import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from '../../utils/format-time';

import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ title, subheader, list, path, isRunning, ...other }) {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate(path);
  };

  return (
    <Card 
    sx={{
      // width: '344px',
      // height: '200px',
      width: 520, height: 175,
      overflowY: 'auto',
      ...other
    }}>
      <Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
        <CardHeader title={title} subheader={subheader}/>
        <Box sx={{ textAlign: 'center', pt: 2.5, pr: 1.5 }}>
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            onClick={handleViewAllClick}
          />
        </Box>
      </Stack>

        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </Stack>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  isRunning: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NewsItem({ news }) {
  const { image, title, description, postedAt, isRunning } = news;

  let textToShow;
  let isRunningReturn;

  if (isRunning === null || isRunning === undefined) {
    isRunningReturn = false;
  } else if (isRunning === 'true') {
    isRunningReturn = 'Actif';
  } else {
    isRunningReturn = "Inactif";
  }
  
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Box
          component="img"
          alt={title}
          src={image}
          sx={{ width: 25, height: 25, borderRadius: 0.5, flexShrink: 0 }}
        />
        <Link 
          color="inherit" 
          variant="subtitle2" 
          underline="hover" 
          noWrap 
          sx={{ 
            maxWidth: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Link>

        <Typography variant="caption" sx={{ pl: 1, flexShrink: 0, color: 'text.secondary' }}>
          {fToNow(postedAt)}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
          { textToShow !== false && (
          <Typography
            variant="caption"
            sx={{
              pr: 3,
              pl: 2,
              fontWeight: 'bold',
              flexShrink: 0,
              color: isRunning === 'true' ? 'green' : 'red'
            }}
          >
            {isRunningReturn}
          </Typography>
        )}

        </Typography>
        

      </Box>

      
    </Stack>
  );
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    isRunning: PropTypes.bool,
  }),
};
