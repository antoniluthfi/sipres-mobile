import {TransitionPresets} from '@react-navigation/stack';

export const SCREEN_OPTIONS = {
  DEFAULT: {
    headerShown: false,
    ...TransitionPresets.ModalSlideFromBottomIOS,
  },
  SLIDE_LEFT: {
    headerShown: false,
    ...TransitionPresets.SlideFromRightIOS,
  },
};
