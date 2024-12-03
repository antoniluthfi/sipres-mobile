import {Alert, Dimensions, Platform, StatusBar} from 'react-native';
import {ANDROID_PERMISSION_LIST, IOS_PERMISSION_LIST} from './permissions';
import {
  PERMISSIONS,
  requestMultiple,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

interface StatusBarOptions {
  style?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
  hidden?: boolean;
  translucent?: boolean;
}

export const setStatusBarStyle = ({
  style = 'default', // Default style
  backgroundColor = '#FFFFFF', // Default background color
  hidden = false, // Default visibility
  translucent = false, // Default translucency
}: StatusBarOptions) => {
  StatusBar.setBarStyle(style);
  StatusBar.setBackgroundColor?.(backgroundColor); // Only works on Android
  StatusBar.setHidden(hidden, 'fade'); // Optionally, you can use 'slide' for animation
  StatusBar.setTranslucent?.(translucent); // Only works on Android
};

export function boxShadow(
  color: string,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export const requestCustomPermissions = async ({
  onSuccess,
  onFailed,
}: {
  onSuccess: () => void;
  onFailed: () => void;
}) => {
  if (Platform.OS === 'ios') {
    const statuses = await requestMultiple(IOS_PERMISSION_LIST);

    if (
      statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
      statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.BLOCKED
    ) {
      Alert.alert(
        'Permission Denied',
        'Camera or Photo Library access is denied. Please enable it from Settings.',
      );
    }
  } else {
    const notification = await requestNotifications(['alert', 'sound']);
    if (notification.status === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Denied',
        'Notification access is denied. Please enable it from Settings.',
      );
      return;
    }

    requestMultiple(ANDROID_PERMISSION_LIST).then(statuses => {
      const res = Object.values(statuses).find(
        status =>
          status === RESULTS.UNAVAILABLE ||
          status === RESULTS.BLOCKED ||
          status === RESULTS.DENIED,
      );

      if (res) {
        onFailed();
      } else {
        onSuccess();
      }
    });
  }
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
