import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import CarouselButton from './CarouselButton';
import Pagination from './PaginationItem';
import {CarouselRenderItem} from 'react-native-reanimated-carousel/lib/typescript/types';
import {COLORS} from '../../utils/colors';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../../utils/functions';
import React, {
  Fragment,
  memo,
  ReactNode,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';

interface IProps {
  data: any[];
  renderItem: CarouselRenderItem<any>;
  renderCarouselTitle?: ReactNode;
  autoPlay?: boolean;
  showButtonNavigator?: boolean;
  scrollAnimationDuration?: number;
  height?: number;
  paginationSize?: number;
  paginationColor?: string;
  paginationPosition?: number;
  containerStyle?: StyleProp<ViewStyle>;
  carouselWidth?: number;
  showScrollDot?: boolean;
  loop?: boolean;
  arrowLeftPosition?: StyleProp<ViewStyle>;
  arrowRightPosition?: StyleProp<ViewStyle>;
}

const CustomCarousel = forwardRef<ICarouselInstance, IProps>(
  (
    {
      data,
      renderItem,
      renderCarouselTitle,
      autoPlay = false,
      showButtonNavigator = true,
      scrollAnimationDuration = 1000,
      height = WINDOW_HEIGHT / 3,
      paginationSize,
      paginationColor = COLORS.PRIMARY,
      paginationPosition,
      containerStyle = {width: '100%'},
      carouselWidth = WINDOW_WIDTH,
      showScrollDot = true,
      loop = true,
      arrowLeftPosition,
      arrowRightPosition,
    },
    ref,
  ) => {
    const progressValue = useSharedValue<number>(0);
    const carouselRef = useRef<ICarouselInstance>(null);

    useImperativeHandle(ref, () => carouselRef.current!);

    const handleProgressChange = (_: number, absoluteProgress: number) => {
      progressValue.value = absoluteProgress;
    };

    const handleLeftButtonPress = () => {
      carouselRef.current?.scrollTo({count: -1, animated: true});
    };

    const handleRightButtonPress = () => {
      carouselRef.current?.scrollTo({count: 1, animated: true});
    };

    return (
      <View style={containerStyle}>
        <Carousel
          loop={loop}
          ref={carouselRef}
          width={carouselWidth}
          height={height}
          autoPlay={autoPlay}
          data={data}
          scrollAnimationDuration={scrollAnimationDuration}
          onProgressChange={handleProgressChange}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          renderItem={renderItem}
        />
        <Pagination
          data={data}
          show={showScrollDot && !!progressValue}
          backgroundColor={paginationColor}
          animValue={progressValue}
          length={data.length}
          size={paginationSize}
          marginTop={paginationPosition}
        />

        {showButtonNavigator && (
          <Fragment>
            <CarouselButton
              iconName="arrowleft"
              onPress={handleLeftButtonPress}
              arrowLeftPosition={arrowLeftPosition}
            />
            <CarouselButton
              iconName="arrowright"
              onPress={handleRightButtonPress}
              arrowRightPosition={arrowRightPosition}
            />
          </Fragment>
        )}

        {renderCarouselTitle}
      </View>
    );
  },
);

export default memo(CustomCarousel);
