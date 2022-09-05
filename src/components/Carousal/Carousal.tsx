import { useState } from 'react';
import VideoCard from '../VideoCard/VideoCard';

const Carousal: React.FC = () => {
  const [titles, setTitles] = useState<Title[]>([
    {
      id: 'asdf364asgsf354',
      title: 'interstellar',
      cover: '/covers/interstellar.webp',
      preview: '/previews/interstellar.mp4',
    },
    {
      id: 'afd66a4sdfa7sd',
      title: 'brooklyn nine nine',
      cover: '/covers/b99.jpeg',
      preview: '/previews/b99.mp4',
    },
    {
      id: 'asdfsg7sfdssad',
      title: 'Batman dark knight',
      cover: '/covers/btm.jpeg',
      preview: '/previews/btm.mp4',
    },
    {
      id: 'gasg76557sf',
      title: 'The office',
      cover: '/covers/office.png',
      preview: '/previews/office.mp4',
    },
    {
      id: 'ahadfhasgsf354',
      title: 'interstellar',
      cover: '/covers/interstellar.webp',
      preview: '/previews/interstellar.mp4',
    },
    {
      id: 'aasjfhdga4sdfa7sd',
      title: 'brooklyn nine nine',
      cover: '/covers/b99.jpeg',
      preview: '/previews/b99.mp4',
    },
    {
      id: 'asdfjdfgsg7sfdssad',
      title: 'Batman dark knight',
      cover: '/covers/btm.jpeg',
      preview: '/previews/btm.mp4',
    },
    {
      id: 'gasg7jsfty6557sf',
      title: 'The office',
      cover: '/covers/office.png',
      preview: '/previews/office.mp4',
    },
  ]);
  return (
    <div className='flex items-center justify-start w-full  h-full mx-8 overflow-x-visible '>
      {titles.map(title => (
        <VideoCard key={title.id} title={title} />
      ))}
    </div>
  );
};

export default Carousal;
