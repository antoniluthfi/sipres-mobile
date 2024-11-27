import Button from '../../shared/components/button';
import React, {useEffect, useMemo, useState} from 'react';
import {FONTS} from '../../shared/utils/fonts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {setStatusBarStyle} from '../../shared/utils/functions';
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  ANDROID_PERMISSION_LIST,
  IOS_PERMISSION_LIST,
} from '../../shared/utils/permissions';

type Props = NavigationProp<RootStackParamList, 'Permission'>;

const PermissionScreen = () => {
  const navigation = useNavigation<Props>();
  const [statusResult, setStatusResult] = useState<any>({});

  const cameraPermissionLabel: any = useMemo(() => {
    return Platform.OS === 'android'
      ? statusResult[PERMISSIONS.ANDROID.CAMERA]
      : statusResult[PERMISSIONS.IOS.CAMERA];
  }, [statusResult]);

  const locationPermissionLabel: any = useMemo(() => {
    const res: any = Object.keys(statusResult).find(permission => {
      if (permission !== PERMISSIONS.ANDROID.CAMERA || PERMISSIONS.IOS.CAMERA) {
        return (
          statusResult[permission] === RESULTS.UNAVAILABLE ||
          statusResult[permission] === RESULTS.BLOCKED ||
          statusResult[permission] === RESULTS.DENIED
        );
      }
    });

    return statusResult[res] || RESULTS.GRANTED;
  }, [statusResult]);

  const checkPermission = () => {
    checkMultiple([...ANDROID_PERMISSION_LIST, ...IOS_PERMISSION_LIST]).then(
      statuses => {
        setStatusResult(statuses);
      },
    );

    if (
      cameraPermissionLabel === RESULTS.GRANTED &&
      locationPermissionLabel === RESULTS.GRANTED
    ) {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    setStatusBarStyle({
      style: 'dark-content',
      backgroundColor: 'white',
    });

    checkPermission();

    const handleBackPress = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit the app?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Exit', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      setStatusResult({});
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.permissionTable}>
        <View style={styles.row}>
          <Text style={styles.permissionText}>Camera Permission</Text>
          <Text
            style={
              cameraPermissionLabel === RESULTS.GRANTED
                ? styles.successStatus
                : styles.dangerStatus
            }>
            {cameraPermissionLabel}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.permissionText}>Location Permission</Text>
          <Text
            style={
              locationPermissionLabel === RESULTS.GRANTED
                ? styles.successStatus
                : styles.dangerStatus
            }>
            {locationPermissionLabel}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Refresh Page"
          containerStyle={{backgroundColor: 'green'}}
          onPress={checkPermission}
        />
        <Button
          title="Exit App"
          containerStyle={{backgroundColor: 'red'}}
          onPress={() => BackHandler.exitApp()}
        />
        <Button
          title="Open Settings"
          onPress={() =>
            openSettings('application').catch(() =>
              console.warn('Cannot open app settings'),
            )
          }
        />
      </View>
    </View>
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: 'white',
  },
  permissionTable: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  permissionText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 14,
  },
  dangerStatus: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    color: 'red',
    textTransform: 'capitalize',
    width: '20%',
  },
  successStatus: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    color: 'green',
    textTransform: 'capitalize',
    width: '20%',
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
});
