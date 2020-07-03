import Link from 'next/link';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ApartmentIcon from '@material-ui/icons/Apartment';
import PeopleIcon from '@material-ui/icons/People';
import ScheduleIcon from '@material-ui/icons/Schedule';
import InputIcon from '@material-ui/icons/Input';
import BarChartIcon from '@material-ui/icons/BarChart';

const MODULES = [
    { label: 'Bienes', url: '/bienes', icon: ApartmentIcon },
    { label: 'Interfases', url: '/interfases', icon: InputIcon },
    { label: 'Planes', url: '/planes', icon: ScheduleIcon },
    { label: 'Reportes', url: '/reportes', icon: BarChartIcon },
    { label: 'Seguridad', url: '/seguridad', icon: PeopleIcon },
];

const ModulesList: React.FC = () => {
    return (
        <List>
            {MODULES.map((module) => (
                <Link href={module.url} key={module.label}>
                    <ListItem button>
                        <ListItemIcon>
                            <module.icon />
                        </ListItemIcon>
                        <ListItemText primary={module.label} />
                    </ListItem>
                </Link>
            ))}
        </List>
    );
};

export default ModulesList;
