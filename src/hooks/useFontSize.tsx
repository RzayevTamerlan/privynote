import { FontSizeControls } from '@ui/font-size-controls';
import { ReactNode, useState } from 'react';

const DEFAULT_FONT_SIZE = 18;

type UseFontSize = {
  fontSize: number;
  FontSizeControlsComponent: ReactNode;
}

const useFontSize = (): UseFontSize => {
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE); // Default font size in pixels

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 33)); // Increase by 2px but not above 30px
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 10)); // Decrease by 2px but not below 10px
  };

  const resetFontSize = () => {
    setFontSize(DEFAULT_FONT_SIZE); // Reset to default size
  };

  return {
    fontSize,
    FontSizeControlsComponent: <FontSizeControls
      fontSize={fontSize}
      increaseFontSize={increaseFontSize}
      resetFontSize={resetFontSize}
      decreaseFontSize={decreaseFontSize}
    />,
  };
};

export { useFontSize };