import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export default Orientation = () => {
  const [screenInfo, setScrennInfo] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = result => {
      setScrennInfo(result.screen);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  }, []);

  return {
    ...screenInfo,

    isPortrait: screenInfo.height > screenInfo.width,
    isPhone: screenInfo.height > screenInfo.width,
    isTab: screenInfo.width > screenInfo.height,
  };
};
