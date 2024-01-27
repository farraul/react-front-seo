import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableItem from './DraggableItem';

const DroppableArea = ({ children }) => {
  return (
    <Droppable droppableId='droppable'>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default DroppableArea;
