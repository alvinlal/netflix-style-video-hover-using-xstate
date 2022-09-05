import { useRef, useState } from 'react';

const VideoCard: React.FC<{ title: Title }> = ({ title }) => {
  const [canShowVideo, setCanShowVideo] = useState<boolean>(false);
  const [lastStoppedTime, setLastStoppedTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseOver = async () => {
    setCanShowVideo(true);
    if (lastStoppedTime > 10) {
      videoRef.current!.currentTime = 0;
    }
    const playPromise = videoRef.current?.play();
    try {
      await playPromise;
    } catch (err) {}
  };

  const handleMouseOut = () => {
    setCanShowVideo(false);
    setLastStoppedTime(videoRef.current!.currentTime);
    setLastStoppedTime(videoRef.current!.currentTime);
    videoRef.current?.pause();
  };

  return (
    <div
      className='w-[350px] h-[200px]  rounded-md ml-3 flex-shrink-0 hover:scale-125 cursor-pointer  transition-transform'
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        src={title.cover}
        alt='cover'
        className={`${canShowVideo ? 'hidden' : 'inline-block'} w-full h-full rounded-md`}
      />
      <video
        preload='none'
        playsInline
        ref={videoRef}
        className={`${!canShowVideo ? 'hidden' : 'inline-block'} w-full h-full rounded-md `}
      >
        <source src={title.preview} type='video/mp4' />
      </video>
    </div>
  );
};

export default VideoCard;
