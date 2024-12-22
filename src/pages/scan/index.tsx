/* eslint-disable react-hooks/exhaustive-deps */

import appBar from '../../shared/components/leading/AppBar';
import Geolocation from 'react-native-geolocation-service';
import Leading from '../../shared/components/leading';
import React, {useEffect, useRef, useState} from 'react';
import useAuthStore from '../../shared/data-store/useAuthStore';
import useAxios from '../../shared/hooks/useAxios';
import {COLORS} from '../../shared/utils/colors';
import {FONTS} from '../../shared/utils/fonts';
import {isIos} from '../../shared/utils/functions';
import {useAppStateListener} from '../../shared/hooks/useAppStateListener';
import {useShallow} from 'zustand/shallow';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

type RouteProps = RouteProp<RootStackParamList, 'ScanQr'>;

const ScanScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const {hasPermission} = useCameraPermission();
  const {appState} = useAppStateListener();
  const api = useAxios();

  const [qrCode, setQrCode] = useState('');
  const [isCameraInitialized, setIsCameraInitialized] = useState(isIos);
  const [flash, setFlash] = useState<'on' | 'off'>(isIos ? 'off' : 'on');
  const [isLoading, setIsLoading] = useState(false);

  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        if (codes[0].value) {
          setTimeout(() => setQrCode(codes?.[0]?.value || ''), 500);
        }
      }
      return;
    },
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title="Scan Kode QR" />,
      }),
    );
  }, [navigation]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCameraInitialized) {
      timeout = setTimeout(() => {
        setFlash('off');
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCameraInitialized]);

  const onInitialized = () => {
    setIsCameraInitialized(true);
  };

  const getCurrentPosition = async () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          if (position.mocked) {
            Alert.alert('Gagal', 'Silahkan matikan fake GPS', [
              {
                text: 'OK',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ]);
            reject(new Error('Fake GPS detected'));
          } else {
            console.log(position.coords);
            resolve(position.coords);
          }
        },
        error => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    });
  };

  const handleScanQrCode = async () => {
    try {
      setIsLoading(true);

      const location: any = await getCurrentPosition();

      const response = await api.post('/attendance/record', {
        course_meeting_id: route.params?.courseMeetingId,
        course_id: route.params?.courseId,
        student_id: userData?.id,
        latitude: location?.latitude?.toString() || '-',
        longitude: location?.longitude?.toString() || '-',
        qr_code: qrCode,
        status: 'present',
        remarks: 'Absensi Menggunakan QR Code',
      });

      if (response.data?.message === 'Attendance has been recorded') {
        Alert.alert('Success', 'Attendance has been recorded', [
          {
            text: 'OK',
            onPress: () => {
              navigation.replace('MainTab');
            },
          },
        ]);
      }
    } catch (error: any) {
      console.log('error handleScanQrCode: ', error);
      Alert.alert('Warning', error?.error || error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (qrCode) {
      handleScanQrCode();
    }
  }, [qrCode]);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Permission Accepted</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Camera Device Error</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Scan Kode QR Untuk Melakukan Absensi</Text>
      <View style={styles.cameraContainer}>
        <Camera
          ref={camera}
          torch={flash}
          onInitialized={onInitialized}
          style={styles.camera}
          device={device}
          isActive={
            !isLoading
              ? isFocused && appState === 'active' && isCameraInitialized
              : false
          }
          codeScanner={codeScanner}
        />

        {/* Border sudut atas kiri */}
        <View style={[styles.corner, styles.topLeft]} />
        {/* Border sudut atas kanan */}
        <View style={[styles.corner, styles.topRight]} />
        {/* Border sudut bawah kiri */}
        <View style={[styles.corner, styles.bottomLeft]} />
        {/* Border sudut bawah kanan */}
        <View style={[styles.corner, styles.bottomRight]} />
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            <Text style={styles.loadingText}>Memproses...</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 20,
  },
  cameraContainer: {
    width: '80%',
    height: 400,
    position: 'relative',
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontFamily: FONTS.POPPINS_BOLD,
  },
  corner: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderColor: COLORS.PRIMARY,
  },
  topLeft: {
    top: -10,
    left: -10,
    borderLeftWidth: 5,
    borderTopWidth: 5,
  },
  topRight: {
    top: -10,
    right: -10,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeft: {
    bottom: -10,
    left: -10,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRight: {
    bottom: -10,
    right: -10,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.BLACK,
    fontSize: 16,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
});
