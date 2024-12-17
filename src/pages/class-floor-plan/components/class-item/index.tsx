import React from 'react';
import {COLORS} from '../../../../shared/utils/colors';
import {LocationData} from '../../../../shared/api/useLocationList';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

type ClassItemProps = {
  item: LocationData;
};

const ClassItem = ({item}: ClassItemProps) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>
          Latitude: <Text style={styles.cardValue}>{item.latitude}</Text>
        </Text>
        <Text style={styles.cardText}>
          Longitude: <Text style={styles.cardValue}>{item.longitude}</Text>
        </Text>
        <Text style={styles.cardText}>
          Radius: <Text style={styles.cardValue}>{item.radius} m</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ClassItem;

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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'column',
  },
  cardText: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginBottom: 4,
  },
  cardValue: {
    fontWeight: '600',
    color: COLORS.BLACK,
  },
});
