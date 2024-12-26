import Button from '../../../../shared/components/button';
import FileViewer from 'react-native-file-viewer';
import RadioButton from '../../../../shared/components/radio-button';
import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import RNFS from 'react-native-fs';
import useAuthStore from '../../../../shared/data-store/useAuthStore';
import useAxios from '../../../../shared/hooks/useAxios';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../shared/utils/colors';
import {FONTS} from '../../../../shared/utils/fonts';
import {LucideListFilter} from 'lucide-react-native';
import {useShallow} from 'zustand/shallow';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  UserCourseData,
  useUserCoursesList,
} from '../../../../shared/api/useUserCoursesList';

type FilterProps = {
  onSubmit: (courseId: string) => void;
};

const Filter = ({onSubmit}: FilterProps) => {
  const api = useAxios();
  const {userData} = useAuthStore(
    useShallow((state: any) => ({
      userData: state.userData,
    })),
  );

  const filterModalRef = useRef<BottomSheetModal>(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userCourses = useUserCoursesList({
    limit: 100,
    user_id: userData?.id,
  });

  const snapPoints = useMemo(() => ['75%', '75%'], []);

  const handleSubmit = useCallback(() => {
    if (!selectedCourseId) {
      Alert.alert('Peringatan', 'Silakan pilih mata kuliah terlebih dahulu.');
      return;
    }

    onSubmit(selectedCourseId);
    filterModalRef.current?.close();
  }, [onSubmit, selectedCourseId]);

  const handleDownloadReport = async () => {
    if (!selectedCourseId) {
      Alert.alert('Peringatan', 'Silakan pilih mata kuliah terlebih dahulu.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post(
        '/report/attendance-recap-per-user',
        {
          course_id: selectedCourseId,
          user_id: userData?.id,
        },
        {
          responseType: 'blob',
        },
      );

      console.log(response.data);
      // Konversi arraybuffer menjadi string Base64
      const base64Data = btoa(
        String.fromCharCode(...new Uint8Array(response.data)),
      );
      console.log({base64Data});

      const filePath = `${
        RNFS.DownloadDirectoryPath
      }/rekap-absensi-${new Date().getTime()}.pdf`;
      await RNFS.writeFile(filePath, base64Data, 'base64');

      Alert.alert('Berhasil', 'Laporan berhasil diunduh.', [
        {
          text: 'Buka',
          onPress: async () => {
            await FileViewer.open(filePath).catch(error => {
              console.error('Error membuka file: ', error);
              Alert.alert('Kesalahan', 'Tidak dapat membuka file.');
            });
          },
        },
      ]);
    } catch (error: any) {
      console.log('error handleDownloadReport: ', error);
      Alert.alert(
        'Kesalahan',
        error.response?.data?.message ||
          'Terjadi kesalahan saat mengunduh laporan.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => filterModalRef.current?.present()}>
          <Text style={styles.filterText}>Filter</Text>
          <LucideListFilter />
        </TouchableOpacity>
      </View>

      <BottomSheetModal
        ref={filterModalRef}
        onChange={() => {}}
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
          <Text style={styles.title}>Filter</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Mata Kuliah</Text>
            {userCourses?.data?.map((course: UserCourseData) => (
              <RadioButton
                key={course.id}
                title={course.course_name}
                isChecked={course.course_id.toString() === selectedCourseId}
                onPress={() => setSelectedCourseId(course.course_id.toString())}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Download Rekap Absensi"
              containerStyle={[styles.button, styles.downloadButton]}
              isLoading={isLoading}
              onPress={handleDownloadReport}
            />
            <Button
              title="Submit"
              containerStyle={styles.button}
              onPress={handleSubmit}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default memo(Filter);

const styles = StyleSheet.create({
  filterContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '25%',
    justifyContent: 'flex-end',
  },
  filterText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 14,
    color: COLORS.BLACK,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 18,
    marginBottom: 20,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  button: {
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: COLORS.RED,
  },
});
