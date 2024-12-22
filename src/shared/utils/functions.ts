import Geolocation from 'react-native-geolocation-service';
import {Alert, Dimensions, Platform, StatusBar} from 'react-native';
import {IOS_PERMISSION_LIST} from './permissions';
import {
  PERMISSIONS,
  request,
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
    const notificationPermission = await requestNotifications(['alert', 'sound']);
    if (notificationPermission.status === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Denied',
        'Notification access is denied. Please enable it from Settings.',
      );
      return;
    }

    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    if (cameraPermission === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Denied',
        'Camera access is denied. Please enable it from Settings.',
      );
      return;
    }

    const locationPermission = await requestAndroidPermissions();
    if (!locationPermission) {
      Alert.alert('Permission Denied', 'Location permission not granted.');
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        if (position.mocked) {
          onFailed();
        } else {
          onSuccess();
        }
      },
      error => {
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }
};

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const requestAndroidPermissions = async () => {
  try {
    // Periksa izin lokasi presisi tinggi
    const fineLocation = await request(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (fineLocation === RESULTS.GRANTED) {
      console.log('ACCESS_FINE_LOCATION granted');
    } else {
      console.log('ACCESS_FINE_LOCATION denied');
      return false;
    }

    // Periksa izin lokasi latar belakang jika diperlukan
    const backgroundLocation = await request(
      PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
    );
    if (backgroundLocation === RESULTS.GRANTED) {
      console.log('ACCESS_BACKGROUND_LOCATION granted');
    } else {
      console.log('ACCESS_BACKGROUND_LOCATION denied');
    }

    return true;
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

const requestiOSPermissions = async () => {
  try {
    // Periksa izin lokasi saat aplikasi digunakan
    const whenInUse = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (whenInUse === RESULTS.GRANTED) {
      console.log('LOCATION_WHEN_IN_USE granted');
    } else {
      console.log('LOCATION_WHEN_IN_USE denied');
      return false;
    }

    // Periksa izin lokasi selalu (opsional, untuk latar belakang)
    const always = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    if (always === RESULTS.GRANTED) {
      console.log('LOCATION_ALWAYS granted');
    } else {
      console.log('LOCATION_ALWAYS denied');
    }

    return true;
  } catch (error) {
    Alert.alert(`Permission Error: ${error}`);
    console.error('Permission error:', error);
    return false;
  }
};
