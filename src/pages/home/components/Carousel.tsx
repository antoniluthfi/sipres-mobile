import CustomCarousel from '../../../shared/components/custom-carousel/CustomCarousel';
import FastImage from 'react-native-fast-image';
import {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {WINDOW_WIDTH} from '../../../shared/utils/functions';

type CarouselRenderItem = {
  id: number;
  image: string;
};

const Carousel: React.FC = () => {
  const renderItem = ({item}: {item: CarouselRenderItem}) => {
    return (
      <View style={styles.itemContainer}>
        <View
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: 10,
          }}>
          <FastImage
            source={{
              uri: item.image,
              priority: FastImage.priority.high,
              cache: 'immutable',
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
          />
        </View>
      </View>
    );
  };

  return (
    <CustomCarousel
      containerStyle={{
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 13,
      }}
      carouselWidth={WINDOW_WIDTH * (90 / 100)}
      data={[
        {
          image:
            'https://itcdevbucket.s3.ap-southeast-3.amazonaws.com/vehicle/banners/1708416275098401.jpeg',
        },
      ]}
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
});
