import React, {ReactNode} from 'react';
import {ArrowLeft} from 'lucide-react-native';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface IIconAction {
  icon: ImageSourcePropType;
  onPress?: () => void;
}

interface IAppBarProps {
  title?: string;
  titleAlign?: 'left' | 'center';
  titleCustom?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  trailingIcons?: IIconAction[];
  headerStyle?: ViewStyle;
}

const appBar = ({
  leading,
  trailing,
  title,
  titleAlign = 'left',
  titleCustom,
  trailingIcons = [],
}: IAppBarProps): StackNavigationOptions => ({
  headerLeft: ({onPress}) => (
    <View>
      {leading ? (
        leading
      ) : (
        <TouchableOpacity onPress={onPress}>
          <ArrowLeft size={30} />
        </TouchableOpacity>
      )}
    </View>
  ),
  headerRight: ({}) => (
    <View style={styles.rightSection}>
      {trailing}
      {trailingIcons.map((e, i) => (
        <TouchableOpacity key={`index_${i}`} onPress={e.onPress}>
          <Image style={[styles.headerIcon, {marginLeft: 0}]} source={e.icon} />
        </TouchableOpacity>
      ))}
    </View>
  ),
  headerTitle: ({}) =>
    titleCustom ?? <Text style={styles.headerTitle}>{title}</Text>,
  headerTitleAlign: titleAlign,
  headerShown: true,
});

export default appBar;

const styles = StyleSheet.create({
  headerIcon: {
    marginLeft: 14,
    marginRight: 14,
    fontSize: 24,
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
