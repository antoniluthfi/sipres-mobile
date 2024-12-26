import Button from '../../../../shared/components/button';
import React from 'react';
import {COLORS} from '../../../../shared/utils/colors';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {LocationData} from '../../../../shared/api/useLocationList';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type ClassItemProps = {
  item: LocationData;
};

type NavigationProps = NavigationProp<RootStackParamList, 'ClassFloorPlan'>;

const ClassItem = ({item}: ClassItemProps) => {
  const navigation = useNavigation<NavigationProps>();

  const handleOpenGoogleMaps = async (lat: string, long: string) => {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    await Linking.openURL(url);
  };

  const handleViewClass = (id: number) => {
    navigation.navigate('ClassFloorPlanDetails', {
      id: item?.id,
    })
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>
          Radius: <Text style={styles.cardValue}>{item.radius} m</Text>
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="Buka GMaps"
          containerStyle={[styles.button, styles.primaryButton]}
          titleStyle={styles.buttonText}
          onPress={() => handleOpenGoogleMaps(item.latitude, item.longitude)}
        />
        <Button
          title="Lihat Denah"
          containerStyle={[styles.button, styles.primaryButton]}
          titleStyle={styles.buttonText}
          onPress={() => handleViewClass(item.id)}
        />
      </View>
    </View>
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
  button: {
    padding: 5,
  },
  buttonText: {
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
    width: '49%',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 7,
  },
});
