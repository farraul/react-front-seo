import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const DraggableItem = ({ id, text, level, children }) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    // Customize the appearance of the draggable item when dragging
  });

  return (
    <Draggable draggableId={id} index={id} key={id}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {level === 1 && <h1>{text}</h1>}
            {level === 2 && <h2>{text}</h2>}
            {level === 3 && <h3>{text}</h3>}
            {children}
          </div>
        );
      }}
    </Draggable>
  );
};

export default DraggableItem;
