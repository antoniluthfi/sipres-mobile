import React, {useEffect, useRef, useState} from 'react';
import {COLORS} from '../../shared/utils/colors';
import {FONTS} from '../../shared/utils/fonts';
import {isIos} from '../../shared/utils/functions';
import {StyleSheet, Text, View} from 'react-native';
import {useAppStateListener} from '../../shared/hooks/useAppStateListener';
import {useIsFocused} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

const ScanScreen = () => {
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const {hasPermission} = useCameraPermission();
  const {appState} = useAppStateListener();

  const [codeScanned, setCodeScanned] = useState('');
  const [isCameraInitialized, setIsCameraInitialized] = useState(isIos);
  const [flash, setFlash] = useState<'on' | 'off'>(isIos ? 'off' : 'on');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        if (codes[0].value) {
          setTimeout(() => setCodeScanned(codes[0]?.value || ''), 500);
        }
      }
      return;
    },
  });

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
          isActive={isFocused && appState === 'active' && isCameraInitialized}
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
    width: 100, // panjang sisi sudut
    height: 100, // panjang sisi sudut
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
});
