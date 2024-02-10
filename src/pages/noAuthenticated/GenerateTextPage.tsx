import { useState } from 'react';
import { GenerateTextForm } from 'src/components/GenerateText/GenerateTextForm';
import { Spinner } from 'src/components/Loaders';

const GenerateTextPage = () => {
  const [textGenerated, setTextGenerated] = useState<any>('');
  const [isLoading, setIsLoading] = useState<any>(false);

  return (
    <section>
      <div className='px-28 mt-28 flex gap-20'>
        <div className='w-1/2'>
          <h1 className='heading-h1'>Generate text</h1>
          <GenerateTextForm setTextGenerated={setTextGenerated} setIsLoading={setIsLoading} />
        </div>
        <div className='w-1/2'>
          {isLoading ? (
            <Spinner absolute={false} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: textGenerated }} />
          )}
        </div>
      </div>
    </section>
  );
};

export default GenerateTextPage;
