import React from 'react';
import { useAtomState } from '@axe/context';
import { contentAtomState } from './atoms';

const Count = () => {
  const [content, setContent] = useAtomState(contentAtomState);

  console.log('render Content', content);

  return (
    <div style={{ textAlign: 'center', lineHeight: 5, backgroundColor: 'purple' }}>
      <div onClick={() => setContent({ ...content, liked: content.liked + 1 })}>
        Liked: {content.liked}
      </div>
      <div onClick={() => setContent({ ...content, collected: content.collected + 1 })}>
        Collected: {content.collected}
      </div>
    </div>
  );
};

export default Count;
