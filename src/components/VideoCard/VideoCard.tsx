import { useEffect, useRef, useState } from 'react';
import { useMachine } from '@xstate/react';
import { netflixStyleVideoHoverMachine } from './VideoCard.machine';

const VideoCard: React.FC<{ title: Title }> = ({ title }) => {
  const [state, send] = useMachine(netflixStyleVideoHoverMachine);
  const [lastStoppedTime, setLastStoppedTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = async () => {
    send('MOUSE_OVER');
  };

  const handleMouseLeave = () => {
    send('MOUSE_OUT');
    videoRef.current!.pause();
    setLastStoppedTime(videoRef.current!.currentTime);
  };

  const handleOnCanPlay = () => {
    send('REPORT_VIDEO_LOADED');
  };

  useEffect(() => {
    if (state.matches({ showingVideo: 'autoPlayingVideo' })) {
      if (lastStoppedTime > 10) {
        videoRef.current!.currentTime = 0;
      }
      videoRef.current!.play();
    }
  }, [state, lastStoppedTime]);

  console.log(state.value);

  return (
    <div
      className='w-[350px] h-[200px]  rounded-md ml-3 flex-shrink-0 hover:scale-125 cursor-pointer  transition-transform'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={title.cover}
        alt='cover'
        className={`${
          state.matches({ showingVideo: 'autoPlayingVideo' }) ? 'hidden' : 'inline-block'
        } w-full h-full rounded-md`}
      />
      <video
        playsInline
        ref={videoRef}
        onCanPlay={handleOnCanPlay}
        className={`${
          state.matches({ showingVideo: 'autoPlayingVideo' }) ? 'inline-block' : 'hidden'
        } w-full h-full rounded-md `}
        src={title.preview}
      ></video>
    </div>
  );
};

export default VideoCard;
