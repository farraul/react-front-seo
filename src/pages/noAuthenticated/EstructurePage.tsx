import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const EstructurePage = () => {
  const [words, setWords] = useState(['Word 1', 'Word 2', 'Word 3']);
  const [droppableAreas, setDroppableAreas] = useState<any>({
    h1: {
      value: 'Seo',
      headings: {
        h2: {
          'heading2.0': {},
          'heading2.1': {},
          'heading3.0': {},
        },
      },
      keywords: {},
    },
  });
  console.log(droppableAreas['h1']['headings']);
  console.log('EstructurePage  droppableAreas:', droppableAreas);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('word', words[index]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDroph1 = (event, tag, areaIndex) => {
    const word = event.dataTransfer.getData('word');
    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      const newKeyword = { ...droppableAreas[tag]['headings']['h2'], [word]: {} };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['headings']: {
            ...prevState[tag]['headings'],
            ['h2']: {
              ...prevState[tag]['headings']['h2'],
              ...newKeyword,
            },
          },
        },
      }));
    }
  };

  const handleDrop = (event, tag, areaIndex) => {
    const word = event.dataTransfer.getData('word');
    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      const newKeyword = { ...droppableAreas[tag]['headings']['h2'], [word]: {} };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: {
          ...prevState[tag],
          ['headings']: {
            ...prevState[tag]['headings'],
            ['h2']: {
              ...prevState[tag]['headings']['h2'],
              ...newKeyword,
            },
          },
        },
      }));
    }
  };

  return (
    <div className='mt-16 mb-1'>
      <div onDragStart={(event) => handleDragStart(event, 0)} draggable>
        <p className='bg-blue-500'>{words[0]}</p>
      </div>
      <div onDragStart={(event) => handleDragStart(event, 1)} draggable>
        <p>{words[1]}</p>
      </div>
      <div className='mb-16' onDragStart={(event) => handleDragStart(event, 2)} draggable>
        <p>{words[2]}</p>
      </div>

      {Object.keys(droppableAreas) &&
        Object.keys(droppableAreas).map((area, areaIndex) => (
          <div key={uuidv4}>
            <div className='bg-blue-600'>
              <div className='pl-10'>
                <p className='font-bold  py-2'>{area}</p>
                <p className=' py-2'>{droppableAreas[area].value}</p>
                <div
                  key={area}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDroph1(event, area, areaIndex)}
                >
                  <h1 className='py-2 text-white'>
                    {`Añadir keywords ${area}. Arrastra aqui.... `}{' '}
                  </h1>
                </div>
              </div>

              <div className='bg-blue-200 ml-20'>
                {Object.keys(droppableAreas[area]['headings']).length
                  ? Object.keys(droppableAreas[area]['headings']).map((heading: any) => {
                      console.log({ heading });
                      return (
                        <div className='pl-20'>
                          <p className='font-bold   py-2'>H2</p>
                          {Object.keys(droppableAreas[area]['headings'][heading]).map(
                            (headingValue: any) => {
                              console.log(headingValue);
                              return (
                                <p className=' p-2' key={uuidv4}>
                                  {headingValue}
                                </p>
                              );
                            },
                          )}
                        </div>
                      );
                    })
                  : null}
                <div
                  className='pl-20 bg-gray-300'
                  key={area}
                  onDragOver={handleDragOver}
                  onDrop={(event) => handleDrop(event, area, areaIndex)}
                >
                  <h1 className='px-2 py-2'>Añadir h2. Arrastra aqui.... </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EstructurePage;
