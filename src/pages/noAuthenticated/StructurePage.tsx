import { useState } from 'react';
// components
import { Button } from 'src/components/PrimitiveElements';
import { ListStructures } from 'src/components/Structure/ListStructures';
import { StructureTemplate } from 'src/components/templates/StructureTemplate';
// utils
import { SeoHeadingWithName } from 'src/models/seo';

const structure: SeoHeadingWithName = {
  name: 'Seo',
  headings: [],
  keywords: [],
  type: 1,
};

const StructurePage = () => {
  const [structureSelected, setStructureSelected] = useState<any>();
  const [droppableAreas, setDroppableAreas] = useState<any>(structure);

  return (
    <article className='mb-32'>
      <section className='px-20'>
        <div className=' mb-16 mt-20 flex items-center flex-col justify-cente'>
          <h1 className=''>Estructuras</h1>
          {/* <p className='mt-5 text-xl'>Selecciona la inteción que quieras revisar</p> */}
        </div>
        <ListStructures
          structure={structure}
          droppableAreas={droppableAreas}
          setStructureSelected={setStructureSelected}
        />
      </section>
      <StructureTemplate
        estructure={structure}
        structureSelected={structureSelected}
        droppableAreas={droppableAreas}
        setDroppableAreas={setDroppableAreas}
      />
    </article>
  );
};

export default StructurePage;
