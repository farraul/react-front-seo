import React from 'react';
import { DndProvider } from 'react-beautiful-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DroppableArea from './DroppableArea';

const DndProviderWrapper = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DroppableArea>{children}</DroppableArea>
    </DndProvider>
  );
};

export default DndProviderWrapper;
