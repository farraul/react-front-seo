import React, { useState } from 'react';

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

  console.log('EstructurePage  words:', words);
  console.log('EstructurePage  droppableAreas:', droppableAreas);

  const [estructureFinal, setEstructureFinal] = useState({});

  console.log('EstructurePage  droppableAreas:', droppableAreas);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('word', words[index]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, tag, areaIndex) => {
    console.log('handleDrop  area:', tag);

    const word = event.dataTransfer.getData('word');
    console.log('handleDrop  word:', word);

    const wordIndex = words.indexOf(word);

    if (wordIndex !== -1) {
      const newWords = [...words];
      newWords.splice(wordIndex, 1);
      setWords(newWords);

      // const newDroppableAreas = [...droppableAreas];
      // newDroppableAreas[areaIndex] = word;
      const newKeyword = { h2: 'dd' };

      setDroppableAreas((prevState: any) => ({
        ...prevState,
        [tag]: { ...prevState[tag], headings: newKeyword },
      }));

      //   setIntentions((prevState: any) => ({
      //     ...prevState,
      //     [param]: { ...prevState[param], news: updatedNews },
      //   }));
      //   setIsChecked(new Array(Object.keys(keywordsImported).length).fill(false));
      //   setKeywordsChecked({});
      // };
    }
  };

  return (
    <div className='mt-16 '>
      <div onDragStart={(event) => handleDragStart(event, 0)} draggable>
        <p className='bg-blue-500'>{words[0]}</p>
      </div>
      <div onDragStart={(event) => handleDragStart(event, 1)} draggable>
        <p>{words[1]}</p>
      </div>
      <div onDragStart={(event) => handleDragStart(event, 2)} draggable>
        <p>{words[2]}</p>
      </div>

      {Object.keys(droppableAreas).map((area, areaIndex) => (
        <div className=''>
          <p className='bg-gray-300 p-6'>
            {area}: {droppableAreas[area].value}
          </p>
          <div
            className=''
            key={area}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, area, areaIndex)}
          >
            <h1 className='px-2 py-2'>Crear {area}</h1>
          </div>
          {console.log(Object.keys(droppableAreas[area].headings))}
          {Object.keys(droppableAreas[area].headings).length
            ? droppableAreas[area].headings.map((headings: any) => {
                {
                  console.log({ headings });
                }

                <p>p</p>;
              })
            : null}
        </div>
      ))}
    </div>
  );
};

export default EstructurePage;
