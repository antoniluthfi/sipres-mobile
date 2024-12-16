import React from 'react';
import {AttendanceRecord} from '../../../../shared/api/useAttendanceRecordList';
import {COLORS} from '../../../../shared/utils/colors';
import {StyleSheet, Text, View} from 'react-native';

type RecordItemProps = {
  item: AttendanceRecord;
};

const RecordItem = ({item}: RecordItemProps) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{item.student.name}</Text>
      <Text style={styles.subText}>
        NIM: {item.student.identification_number}
      </Text>
      <Text style={styles.subText}>
        Mata Kuliah: {item.meeting.course.name}
      </Text>
      <Text style={styles.subText}>
        Pertemuan ke: {item.meeting.meeting_number}
      </Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status:</Text>
        <Text
          style={[
            styles.statusText,
            item.status === 'present' ? styles.present : styles.absent,
          ]}>
          {item.status}
        </Text>
      </View>
      {/* Waktu Kehadiran */}
      <Text style={styles.subText}>
        Waktu Kehadiran: {new Date(item.attendance_time).toLocaleString()}
      </Text>
      {/* Lokasi */}
      <Text style={styles.subText}>
        Lokasi: {item.latitude}, {item.longitude}
      </Text>
    </View>
  );
};

export default RecordItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.GRAY,
    padding: 15,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: COLORS.GRAY,
    marginBottom: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  present: {
    color: COLORS.SUCCESS, // Warna hijau untuk status "present"
  },
  absent: {
    color: COLORS.ERROR, // Warna merah untuk status "absent"
  },
});
