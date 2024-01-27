import React from 'react';
import DraggableItem from './DraggableItem';

const HierarchicalKeyword = ({ id, text, level, children }) => {
  return (
    <DraggableItem id={id} text={text} level={level}>
      {children}
    </DraggableItem>
  );
};

export default HierarchicalKeyword;
