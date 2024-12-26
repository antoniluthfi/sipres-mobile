import Config from '../../shared/config/env.json';
import FastImage from 'react-native-fast-image';
import React, { useEffect } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLORS} from '../../shared/utils/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useLocationDetails} from '../../shared/api/useLocationDetails';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../shared/utils/functions';
import appBar from '../../shared/components/leading/AppBar';
import Leading from '../../shared/components/leading';

type RouteProps = RouteProp<RootStackParamList, 'ClassFloorPlanDetails'>;

const ClassFloorPlanDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProps>();

  const {data, isLoading} = useLocationDetails({id: route.params?.id});

  useEffect(() => {
    navigation.setOptions(
      appBar({
        leading: <Leading title={`Denah ${data?.name}`} />,
      }),
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.PRIMARY} size="large" />
      ) : (
        <FastImage
          source={{
            uri: Config.BE_URL + data?.file_path,
            priority: FastImage.priority.high,
            cache: 'immutable',
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}
    </View>
  );
};

export default ClassFloorPlanDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
});
