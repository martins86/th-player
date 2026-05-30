import { useEffect } from 'react';
import { remoteKeys } from '../navigation/remoteKeys';
import { getFocusableElements } from '../navigation/spatialNav';

interface RemoteControlOptions {
  onEnter?: () => void;
  onBack?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
}

const moveRemoteFocus = (direction: 'left' | 'right' | 'up' | 'down') => {
  const elements = getFocusableElements();

  if (elements.length === 0) {
    return;
  }

  const activeElement = document.activeElement as HTMLElement | null;
  const currentIndex = elements.indexOf(activeElement ?? elements[0]);
  let nextIndex: number;

  if (direction === 'left' || direction === 'up') {
    nextIndex = currentIndex <= 0 ? elements.length - 1 : currentIndex - 1;
  } else {
    nextIndex = currentIndex >= elements.length - 1 ? 0 : currentIndex + 1;
  }

  elements[nextIndex]?.focus();
};

export const useRemoteControl = ({
  onEnter,
  onBack,
  onUp,
  onDown,
  onLeft,
  onRight,
}: RemoteControlOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const isRemoteKey = [
        remoteKeys.ENTER,
        remoteKeys.BACK,
        remoteKeys.ESCAPE,
        remoteKeys.UP,
        remoteKeys.DOWN,
        remoteKeys.LEFT,
        remoteKeys.RIGHT,
      ].includes(key as (typeof remoteKeys)[keyof typeof remoteKeys]);

      if (!isRemoteKey) {
        return;
      }

      event.preventDefault();

      if (key === remoteKeys.ENTER) {
        if (onEnter) {
          onEnter();
          return;
        }

        (document.activeElement as HTMLElement | null)?.click?.();
        return;
      }

      if (key === remoteKeys.BACK || key === remoteKeys.ESCAPE) {
        onBack?.();
        return;
      }

      if (key === remoteKeys.UP) {
        onUp?.();
        moveRemoteFocus('up');
        return;
      }

      if (key === remoteKeys.DOWN) {
        onDown?.();
        moveRemoteFocus('down');
        return;
      }

      if (key === remoteKeys.LEFT) {
        onLeft?.();
        moveRemoteFocus('left');
        return;
      }

      if (key === remoteKeys.RIGHT) {
        onRight?.();
        moveRemoteFocus('right');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter, onBack, onUp, onDown, onLeft, onRight]);
};
