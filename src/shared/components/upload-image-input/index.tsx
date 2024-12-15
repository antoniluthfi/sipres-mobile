import TakePhotoOptionsModal, {TakePhotoOptionsType} from './options-modal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {Camera, Info} from 'lucide-react-native';
import {COLORS} from '../../utils/colors';
import {FONTS} from '../../utils/fonts';
import {ic_image_close} from '../../../assets/icons';
import {useRef, useState} from 'react';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ViewStyle,
  PermissionsAndroid,
  Alert,
  Keyboard,
} from 'react-native';

interface IProps {
  onCameraChange?: (res: ImagePickerResponse['assets']) => void;
  onImageLibraryChange?: (res: ImagePickerResponse['assets']) => void;
  onDelete: (i: number) => void;
  errorMessage?: string;
  label?: string;
  containerStyle?: ViewStyle;
}

const UploadImageInput: React.FC<IProps> = ({
  errorMessage,
  label,
  containerStyle = {marginTop: 10},
  onCameraChange,
  onImageLibraryChange,
}) => {
  const optionsModalRef = useRef<BottomSheetModal>(null);

  const [images, setImages] = useState<any[]>([]);

  const onOpenCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: ImagePickerResponse = await launchCamera({
          mediaType: 'photo',
          quality: 0.5,
          includeBase64: true,
        });

        if (Number(result.assets?.[0]?.fileSize) > 2097152) {
          throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
        } else {
          if (images.length >= 3) {
            throw new Error('Maaf, jumlah gambar maksimal hanya 3');
          }

          onCameraChange?.(result.assets);
          setImages(prev => [...prev, result.assets?.[0]]);
        }
      } else {
        throw new Error('Camera permission denied');
      }
    } catch (error: any) {
      Alert.alert('Warning', error?.message || '');
    }
  };

  const onOpenImageLibrary = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        includeBase64: true,
        selectionLimit: 3,
      });

      if (Number(result.assets?.[0]?.fileSize) > 2097152) {
        throw new Error('Maaf, ukuran file tidak boleh lebih dari 2MB!');
      } else {
        if (images.length >= 3) {
          throw new Error('Maaf, jumlah gambar maksimal hanya 3');
        }

        onImageLibraryChange?.(result.assets);
        setImages(prev => [...prev, result.assets?.[0]]);
      }
    } catch (error: any) {
      Alert.alert('Warning', error?.message || '');
    }
  };

  const handleDeleteImage = (index: number) => {
    const val = [...images];
    val.splice(index, 1);
    setImages(val);
  };

  const handleOpenOptionsModal = () => {
    optionsModalRef.current?.present();
  };

  const handleSelectTakePhotoOptions = (type: TakePhotoOptionsType) => {
    if (type === 'CAMERA') {
      onOpenCamera();
    } else {
      onOpenImageLibrary();
    }
    optionsModalRef.current?.close();
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={containerStyle}>
        {label && <Text style={styles.label}>{label}</Text>}

        <TouchableOpacity
          style={styles.uploadInputContainer}
          onPress={handleOpenOptionsModal}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: FONTS.POPPINS_REGULAR,
              color: COLORS.GRAY,
            }}>
            Ambil / Upload Foto
          </Text>
          <Camera size={35} color={COLORS.GRAY} />
        </TouchableOpacity>
        {errorMessage && (
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Info size={15} color={COLORS.ERROR} />
            <Text style={{fontSize: 12, color: COLORS.ERROR}}>
              {errorMessage}
            </Text>
          </View>
        )}

        <View style={{flexDirection: 'row'}}>
          {images.length > 0 &&
            images.map((image, i) => (
              <View key={`image_${i}`} style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => handleDeleteImage(i)}
                  style={{zIndex: 3}}>
                  <Image source={ic_image_close} style={styles.closeButton} />
                </TouchableOpacity>
                <Image source={{uri: image?.uri}} style={styles.image} />
              </View>
            ))}
        </View>
      </View>

      <TakePhotoOptionsModal
        ref={optionsModalRef}
        onSelectType={handleSelectTakePhotoOptions}
      />
    </>
  );
};

export default UploadImageInput;

const styles = StyleSheet.create({
  uploadInputContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.GRAY,
    borderRadius: 5,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {marginTop: 10, width: 58, height: 58, marginRight: 8},
  closeButton: {
    width: 14,
    height: 14,
    position: 'absolute',
    zIndex: -9,
    right: -3,
    top: -3,
  },
  image: {width: 58, height: 58, borderRadius: 3},
  label: {
    fontSize: 14,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  },
});
