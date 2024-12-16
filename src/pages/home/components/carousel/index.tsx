import CustomCarousel from '../../../../shared/components/custom-carousel/CustomCarousel';
import FastImage from 'react-native-fast-image';
import {Announcement} from '../../../../shared/api/useLatestAnnouncementList';
import {COLORS} from '../../../../shared/utils/colors';
import {memo, useMemo} from 'react';
import {WINDOW_WIDTH} from '../../../../shared/utils/functions';
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

type CarouselProps = {
  data: Announcement[];
  isLoading: boolean;
};

const Carousel = ({data, isLoading}: CarouselProps) => {
  const finalData = useMemo(() => {
    if (data?.length) {
      return data?.slice(0, 3);
    }

    return [];
  }, [data?.length]);

  const handlePress = async (url: string) => {
    await Linking.openURL(url);
  };

  const renderItem = ({item}: {item: Announcement}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => handlePress(item?.href)}>
          <FastImage
            source={{
              uri: item.img,
              priority: FastImage.priority.high,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <CustomCarousel
      containerStyle={styles.carouselContainer}
      carouselWidth={WINDOW_WIDTH * (90 / 100)}
      data={finalData}
      renderItem={renderItem}
      autoPlay
      showButtonNavigator={false}
      scrollAnimationDuration={2000}
      height={103}
      paginationSize={7}
      paginationPosition={10}
    />
  );
};

export default memo(Carousel);

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    top: 13,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  itemContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 13,
  },
  description: {
    color: 'white',
    fontSize: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
  },
});
