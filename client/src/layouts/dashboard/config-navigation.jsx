import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [ 
  {
    title: 'ERP',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  { 
    title: 'transactions',
    path: '/transactions',
    icon: icon('ic_user'),
  },    
  {
    title: 'pompes',
    path: '/pompes',
    icon: icon('ic_user'),
  },  
  {
    title: 'services et logistique',
    path: '/servicesAndLogistique',
    icon: icon('ic_analytics'),
  },  
  {
    title: 'autre',
    path: '/autre',
    icon: icon('ic_user'),
  },
  {
    title: 'gerant',
    path: '/gerant',
    icon: icon('ic_user'),
  }
];

export default navConfig;
