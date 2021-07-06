import { Dimensions, Platform } from 'react-native';

export const isIphoneX = () => {
  const dim = Dimensions.get('window');
  
  return (
    Platform.OS === 'ios' &&
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export const isIPhoneXSize  = dim => {
  return dim.height == 812 || dim.width == 812;
}

export const isIPhoneXrSize  = dim => {
  return dim.height == 896 || dim.width == 896;
}