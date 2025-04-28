import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinite?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSettings, setCurrentSettings] = useState({
    itemWidth,
    frameSize,
    step,
  });

  const maxIndex = images.length - currentSettings.frameSize;

  const handleNext = () => {
    const newIndex = currentIndex + currentSettings.step;

    setCurrentIndex(Math.min(newIndex, maxIndex));
  };

  const handlePrev = () => {
    const newIndex = currentIndex - currentSettings.step;

    setCurrentIndex(Math.max(newIndex, 0));
  };

  const updateSetting = (
    key: 'itemWidth' | 'frameSize' | 'step',
    value: number,
  ) => {
    setCurrentSettings(prev => ({
      ...prev,
      [key]: value,
    }));
    setCurrentIndex(0); // Reset to first page when settings change
  };

  return (
    <div className="carousel">
      <h1 data-cy="title">Carousel</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="itemId">Item Width:</label>
          <input
            id="itemId"
            type="number"
            value={currentSettings.itemWidth}
            onChange={e => updateSetting('itemWidth', Number(e.target.value))}
            data-cy="itemWidthInput"
          />
        </div>

        <div className="control-group">
          <label htmlFor="frameId">Frame Size:</label>
          <input
            id="frameId"
            type="number"
            value={currentSettings.frameSize}
            onChange={e => updateSetting('frameSize', Number(e.target.value))}
            data-cy="frameSizeInput"
          />
        </div>

        <div className="control-group">
          <label htmlFor="stepId">Step:</label>
          <input
            id="stepId"
            type="number"
            value={currentSettings.step}
            onChange={e => updateSetting('step', Number(e.target.value))}
            data-cy="stepInput"
          />
        </div>
      </div>

      <div className="carousel-container">
        <button
          className="carousel-button prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          data-cy="prev"
        >
          Prev
        </button>

        <div
          className="carousel-track"
          style={{
            width: `${currentSettings.frameSize * currentSettings.itemWidth}px`,
          }}
        >
          <ul className="carousel-list">
            {images.map((image, index) => (
              <li
                key={index}
                className="carousel-item"
                style={{
                  width: `${currentSettings.itemWidth}px`,
                  display:
                    index >= currentIndex &&
                    index < currentIndex + currentSettings.frameSize
                      ? 'block'
                      : 'none',
                }}
                data-cy={`item-${index}`}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  style={{ width: `${currentSettings.itemWidth}px` }}
                  data-cy="carousel-image"
                  width={currentSettings.itemWidth}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          className="carousel-button next"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          data-cy="next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
