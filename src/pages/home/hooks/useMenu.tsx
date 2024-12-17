import {
  Building,
  MessageCircleQuestion,
  PhoneCall,
  UsersIcon,
} from 'lucide-react-native';
import {COLORS} from '../../../shared/utils/colors';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export type Menu = {
  name: string;
  icon: React.JSX.Element;
  onPress?: () => void;
};

const useMenu = () => {
  const navigation = useNavigation<any>();

  const menu: Menu[] = [
    {
      name: 'Denah Kelas',
      icon: <Building color={COLORS.PRIMARY} />,
      onPress: () => {
        navigation.navigate('ClassFloorPlan');
      },
    },
    {
      name: 'Kontak Kami',
      icon: <PhoneCall color={COLORS.PRIMARY} />,
      onPress: () => {
        navigation.navigate('ContactUs');
      },
    },
    {
      name: 'Syarat &\nKetentuan',
      icon: <MessageCircleQuestion color={COLORS.PRIMARY} />,
    },
    {
      name: 'Tentang Kami',
      icon: <UsersIcon color={COLORS.PRIMARY} />,
      onPress: async () => {
        await Linking.openURL('https://if.unsil.ac.id/sejarah-singkat/');
      },
    },
  ];

  return menu;
};

export default useMenu;
