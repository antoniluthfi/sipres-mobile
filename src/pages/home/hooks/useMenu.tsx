import {Calendar} from 'lucide-react-native';
import {COLORS} from '../../../shared/utils/colors';

export type Menu = {
  name: string;
  icon: React.JSX.Element;
};

const useMenu = () => {
  const menu: Menu[] = [
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
    {
      name: 'Jadwal Kuliah',
      icon: <Calendar color={COLORS.PRIMARY} />,
    },
  ];

  return menu;
};

export default useMenu;
