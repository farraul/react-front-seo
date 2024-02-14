import { useState } from 'react';
// components
import { Button } from 'src/components/PrimitiveElements';
import { StructureTemplate } from 'src/components/templates/StructureTemplate';
import intentions from 'src/stub/intentionsStub.json';
console.log('intentions:', intentions);

// utils
import { SeoHeadingWithName } from 'src/models/seo';
import { ListIntentions } from 'src/components/StructureComponents/ListIntentions';

const structure: SeoHeadingWithName = {
  name: 'Seo',
  headings: [],
  keywords: [],
  type: 1,
};

const StructurePage = () => {
  const [structureSelected, setStructureSelected] = useState<any>();
  const [droppableAreas, setDroppableAreas] = useState<any>(structure);
  console.log('StructurePage  structure:', structure);
  console.log('StructurePage  droppableAreas:', droppableAreas);

  return (
    <article className='mb-32'>
      <section className='px-20'>
        <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
          <h1 className=''>Estructuras creadas</h1>
          {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
        </div>
        <h2 className='text-center'>Selecciona una intención</h2>
        <p className='text-center'>Para añadir las palabras a la estructura</p>

        <div className='mt-10'>
          <ListIntentions intention={intentions} setStructureSelected={setStructureSelected} />
        </div>
      </section>
      <StructureTemplate
        droppableAreas={droppableAreas}
        structureSelected={structureSelected}
        setDroppableAreas={setDroppableAreas}
      />
    </article>
  );
};

export default StructurePage;
