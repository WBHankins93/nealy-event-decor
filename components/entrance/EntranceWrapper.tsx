'use client';

import { useState, useEffect } from 'react';
import VideoEntrance from './VideoEntrance';

interface EntranceWrapperProps {
  children: React.ReactNode;
}

export default function EntranceWrapper({ children }: EntranceWrapperProps) {
  const [showEntrance, setShowEntrance] = useState(false);
  const [hasShownEntrance, setHasShownEntrance] = useState(false);

  useEffect(() => {
    setShowEntrance(true);
  }, []);

  const handleEntranceComplete = () => {
    setShowEntrance(false);
    setHasShownEntrance(true);
  };

  return (
    <>
      {showEntrance && (
        <VideoEntrance onComplete={handleEntranceComplete} />
      )}
      <div className={hasShownEntrance ? 'animate-fadeIn' : 'opacity-0'}>
        {children}
      </div>
    </>
  );
}