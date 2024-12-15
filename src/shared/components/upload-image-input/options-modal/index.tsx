import React, {forwardRef, useCallback, useMemo} from 'react';
import {Camera, Image} from 'lucide-react-native';
import {COLORS} from '../../../utils/colors';
import {FONTS} from '../../../utils/fonts';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export type TakePhotoOptionsType = 'CAMERA' | 'GALLERY';

type TakePhotoOptionsModalProps = {
  onSelectType: (type: TakePhotoOptionsType) => void;
};

const TakePhotoOptionsModal = forwardRef<
  BottomSheetModal,
  TakePhotoOptionsModalProps
>(({onSelectType}, ref) => {
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      )}>
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Pilih Opsi</Text>

        <View style={{width: '100%', gap: 10}}>
          <TouchableOpacity
            onPress={() => onSelectType('CAMERA')}
            style={styles.button}>
            <Camera size={30} />
            <Text style={styles.buttonText}>Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelectType('GALLERY')}
            style={styles.button}>
            <Image size={30} />
            <Text style={styles.buttonText}>Galeri</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default TakePhotoOptionsModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
  },
  buttonText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.BLACK,
    fontSize: 16,
  },
  title: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 18,
  },
});
