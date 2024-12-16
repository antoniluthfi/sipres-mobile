import {Building, Calendar, MessageCircleQuestion, UsersIcon} from 'lucide-react-native';
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
      name: 'Denah Kelas',
      icon: <Building color={COLORS.PRIMARY} />,
    },
    {
      name: 'Bantuan',
      icon: <MessageCircleQuestion color={COLORS.PRIMARY} />,
    },
    {
      name: 'Tentang Kami',
      icon: <UsersIcon color={COLORS.PRIMARY} />,
    },
  ];

  return menu;
};

export default useMenu;
