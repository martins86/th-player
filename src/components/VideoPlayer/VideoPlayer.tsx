import React, { useEffect, useRef } from 'react';

type Props = {
  src: string;
  title?: string;
};

export default function VideoPlayer({ src, title }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = src;
    v.play().catch(() => {
      // autoplay may be blocked; user can press play
    });
  }, [src]);

  return (
    <div className="video-player">
      {title && <h3>{title}</h3>}
      <video
        ref={videoRef}
        controls
        playsInline
        style={{ width: '100%', maxWidth: 960, background: '#000' }}
        data-remote-focusable
      />
    </div>
  );
}
