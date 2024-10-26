import type { FC } from 'react';
import { Button } from '@ui/button';

interface FontSizeControlsProps {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const FontSizeControls: FC<FontSizeControlsProps> = ({
                                                       fontSize,
                                                       increaseFontSize,
                                                       decreaseFontSize,
                                                       resetFontSize,
                                                     }) => {
  return (
    <div className="flex flex-col w-fit gap-5 mb-4">
      <div className="flex items-center gap-5">
        <Button
          onClick={decreaseFontSize}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded md:hover:bg-blue-600"
        >
          A-
        </Button>
        <span>Font size: {fontSize}px</span>
        <Button
          onClick={increaseFontSize}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded md:hover:bg-blue-600"
        >
          A+
        </Button>
      </div>
      <Button
        onClick={resetFontSize}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Reset
      </Button>
    </div>
  );
};

export { FontSizeControls };
