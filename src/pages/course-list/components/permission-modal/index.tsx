import BSheetInput from '../../../../shared/components/bottom-sheet-input';
import Button from '../../../../shared/components/button';
import React, {forwardRef, useCallback, useMemo, useState} from 'react';
import UploadImageInput from '../../../../shared/components/upload-image-input';
import useAuthStore from '../../../../shared/data-store/useAuthStore';
import useAxios from '../../../../shared/hooks/useAxios';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../../shared/utils/fonts';
import {ImagePickerResponse} from 'react-native-image-picker';
import {UserCourseData} from '../../../../shared/api/useUserCoursesList';
import {useShallow} from 'zustand/shallow';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type PermissionModalProps = {
  data?: UserCourseData;
};

const PermissionModal = forwardRef<BottomSheetModal, PermissionModalProps>(
  ({data}, ref) => {
    const api = useAxios();
    const [remarks, setRemarks] = useState('');
    const [file, setFile] = useState<ImagePickerResponse['assets']>([]);
    const [isLoading, setIsLoading] = useState(false);

    const {userData} = useAuthStore(
      useShallow((state: any) => ({
        userData: state.userData,
      })),
    );

    const snapPoints = useMemo(() => ['75%', '75%'], []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);

    const handleSubmit = async () => {
      try {
        setIsLoading(true);

        const formData = new FormData();

        // Menambahkan data teks ke FormData
        formData.append('course_meeting_id', data?.upcoming_schedule?.id || '');
        formData.append('course_id', data?.course_id || '');
        formData.append('student_id', userData?.id || '');
        formData.append('latitude', '-');
        formData.append('longitude', '-');
        formData.append('qr_code', '-');
        formData.append('status', 'permission');
        formData.append('remarks', remarks);

        // Menambahkan file jika ada
        if (file && file.length > 0) {
          formData.append('file', {
            uri: file[0]?.uri,
            name: file[0]?.fileName || 'file.jpg',
            type: file[0]?.type || 'image/jpeg',
          });
        }

        const response = await api.post('/attendance/record', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data?.message === 'Attendance has been recorded') {
          Alert.alert('Success', 'Attendance has been recorded');
          setRemarks('');
          setFile([]);
          (ref as any)?.current?.close?.();
        }
      } catch (error: any) {
        console.log('error handleSubmit: ', error);
        Alert.alert(
          'Warning',
          error?.response?.data?.message ||
            error?.message ||
            error?.errors?.[0]?.msg,
        );
      } finally {
        setIsLoading(false);
      }
    };

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
          <Text style={styles.title}>Pengajuan Izin</Text>

          <View style={{width: '100%', paddingHorizontal: 20}}>
            <BSheetInput
              label="Keterangan"
              multiline
              numberOfLines={4}
              value={remarks}
              onChange={setRemarks}
            />

            <UploadImageInput
              label="Upload File Pendukung (Opsional)"
              onCameraChange={setFile}
              onImageLibraryChange={setFile}
              onDelete={() => {
                setFile([]);
              }}
            />

            <Button
              title="Submit"
              containerStyle={{marginTop: 20}}
              isLoading={isLoading}
              onPress={handleSubmit}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default PermissionModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 18,
    marginBottom: 20,
  },
});
