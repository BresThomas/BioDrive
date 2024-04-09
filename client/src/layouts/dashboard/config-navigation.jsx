import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [ 
  {
    title: 'ERP Employé',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },      
  {
    title: 'ERP Gérant',
    path: '/gerant',
    icon: icon('ic_user'),
  }
];

export default navConfig;
