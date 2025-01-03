import Button from '../../../../shared/components/button';
import React, {memo, useMemo} from 'react';
import {addMinutes, format, isAfter, isBefore} from 'date-fns';
import {COLORS} from '../../../../shared/utils/colors';
import {FONTS} from '../../../../shared/utils/fonts';
import {id} from 'date-fns/locale';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Info, MapPin} from 'lucide-react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {UserCourseData} from '../../../../shared/api/useUserCoursesList';

type CourseItemProps = {
  item: UserCourseData;
  onPressPermission: (data: UserCourseData) => void;
  onPressSick: (data: UserCourseData) => void;
};

type NavigationProps = NavigationProp<RootStackParamList, 'ScanQr'>;

const PLACEHOLDER_IMAGE = 'https://dummyimage.com/400x200/8c8c8c/000000';

const CourseItem = ({
  item,
  onPressPermission,
  onPressSick,
}: CourseItemProps) => {
  const navigation = useNavigation<NavigationProps>();

  const formattedDate = useMemo(() => {
    if (item?.upcoming_schedule?.date) {
      const date = new Date(item?.upcoming_schedule?.date || '');
      const formatted = format(date, 'eeee, dd MMMM yyyy', {locale: id});

      return formatted;
    }

    return '';
  }, [item?.upcoming_schedule?.date]);

  const courseStartTime = item?.upcoming_schedule?.start_time?.substring(0, 5);
  const courseEndTime = item?.upcoming_schedule?.end_time?.substring(0, 5);

  const isQrCodeDisabled = (
    date: string,
    startTime: string,
    endTime: string,
  ) => {
    const now = new Date();

    const deviceTimezoneOffset = new Date().getTimezoneOffset();
    const dateOnly = addMinutes(new Date(date), -deviceTimezoneOffset);

    const startDateTime = new Date(
      `${dateOnly.toISOString().split('T')[0]}T${startTime}`,
    );
    const endDateTime = new Date(
      `${dateOnly.toISOString().split('T')[0]}T${endTime}`,
    );

    return isBefore(now, startDateTime) || isAfter(now, endDateTime);
  };

  const hasTakenAttendance = useMemo(() => {
    const res = item?.attendance_recap?.find(
      attendance =>
        Number(attendance?.meeting_number) ===
        Number(item?.upcoming_schedule?.meeting_number),
    );

    return !!res?.attendance_record;
  }, [item]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Image source={{uri: PLACEHOLDER_IMAGE}} style={styles.image} />
        <View style={styles.cardDetails}>
          <Text style={styles.courseTitle}>S1 Teknik Informatika</Text>
          <Text style={styles.courseCategory}>{item?.course_name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} />
            <Text style={styles.locationText}>Kelas A</Text>
          </View>
          {formattedDate ? (
            <>
              <Text style={styles.scheduleTitle}>Jadwal</Text>
              <Text style={styles.scheduleText}>{formattedDate}</Text>
              <Text style={styles.scheduleText}>
                {courseStartTime} - {courseEndTime} WIB
              </Text>
            </>
          ) : (
            <Text style={styles.noScheduleText}>Tidak ada jadwal</Text>
          )}
        </View>
      </View>

      {formattedDate && (
        <>
          {hasTakenAttendance ? (
            <View style={styles.attendanceAlert}>
              <Info size={12} />
              <Text style={styles.attendanceAlertTitle}>
                Anda telah melakukan absensi
              </Text>
            </View>
          ) : (
            <View style={styles.cardActions}>
              <Button
                title="Hadir"
                disabled={isQrCodeDisabled(
                  item?.upcoming_schedule?.date,
                  item?.upcoming_schedule?.start_time,
                  item?.upcoming_schedule?.end_time,
                )}
                containerStyle={styles.button}
                titleStyle={styles.buttonText}
                onPress={() =>
                  navigation.navigate('ScanQr', {
                    courseId: item?.course_id,
                    courseMeetingId: item?.upcoming_schedule?.id,
                  })
                }
              />
              <View style={styles.actionButtons}>
                <Button
                  title="Izin"
                  containerStyle={[styles.button, styles.redButton]}
                  titleStyle={styles.buttonText}
                  onPress={() => onPressPermission(item)}
                />
                <Button
                  title="Sakit"
                  containerStyle={[styles.button, styles.redButton]}
                  titleStyle={styles.buttonText}
                  onPress={() => onPressSick(item)}
                />
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default memo(CourseItem);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.GRAY,
    elevation: 4,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    gap: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 5,
  },
  cardDetails: {
    flex: 1,
  },
  courseTitle: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 16,
  },
  courseCategory: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 12,
  },
  scheduleTitle: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: 12,
  },
  scheduleText: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 12,
  },
  cardActions: {
    gap: 5,
  },
  button: {
    padding: 5,
  },
  buttonText: {
    fontSize: 12,
  },
  redButton: {
    backgroundColor: COLORS.RED,
    width: '49%',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 7,
  },
  attendanceAlert: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#E7F3FF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  attendanceAlertTitle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: 'black',
    fontSize: 12,
  },
  noScheduleText: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 14,
    color: COLORS.BLACK,
  },
});
