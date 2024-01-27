import React from 'react';
import { useState } from 'react';
import keywordsStub from 'src/stub/keywordsStub.json';
import intentionsStub from 'src/stub/intentionsStub.json';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

export const HandleKewyords = ({ intentions, intentionSelected, setIntentions }: any) => {
  return (
    <div className=' w-full max-w-sm border-2 bg-gray-700'>
      <p className='bg-gray-800 text-l px-10 py-4 '>Nuevas palabras</p>
      {Object.keys(intentions[intentionSelected]['news']).length ? (
        <div className='px-6  bg-gray-700 pb-8  overflow-y-auto max-h-[550px]		'>
          {Object.keys(intentions[intentionSelected]['news']).map((keyword) => (
            <>
              <div key={keyword} className='flex mt-4 flex-col '>
                <p className=' w-full flex justify-between'>
                  {keyword}
                  <span className='ml-4 text-green-400  mr-2'>
                    {intentions[intentionSelected]['news'][keyword]}
                  </span>
                </p>
                <div className='w-full mt-2'>
                  <Select
                    required
                    onValueChange={(param) => {
                      const mainKeyword = param.split('*')[1];
                      const typeKeyword: any = param.split('*')[2];
                      const keyword: any = param.split('*')[3];
                      const vol: any = param.split('*')[4];
                      const updatedType: any = Object.assign(
                        ...[intentions[intentionSelected][mainKeyword][typeKeyword]],
                        { [keyword]: vol },
                      );

                      delete intentions[intentionSelected]['news'][keyword];

                      setIntentions((prevState: any) => ({
                        ...prevState,
                        [intentionSelected]: {
                          ...prevState[intentionSelected],
                          [mainKeyword]: {
                            ...prevState[intentionSelected][mainKeyword],
                            [typeKeyword]: updatedType,
                          },
                          ['news']: intentions[intentionSelected]['news'],
                        },
                      }));
                    }}
                  >
                    <SelectTrigger className='w-[100%] bg-white text-black'>
                      <SelectValue placeholder='Asignar' />
                    </SelectTrigger>

                    <SelectContent>
                      <>
                        {Object.keys(intentions[intentionSelected])
                          .filter((b: any) => b !== 'news')
                          .map((i: any) => {
                            return (
                              <>
                                <SelectGroup>
                                  <SelectLabel>{i}</SelectLabel>

                                  <SelectItem
                                    key={`synonymous${i}`}
                                    value={`${intentionSelected}*${i}*synonymous*${keyword}*${intentions[intentionSelected]['news'][keyword]}`}
                                  >
                                    Sinónimos
                                  </SelectItem>
                                  <SelectItem
                                    key={`longTail${i}`}
                                    value={`${intentionSelected}*${i}*longTail*${keyword}*${intentions[intentionSelected]['news'][keyword]}`}
                                  >
                                    Long tails
                                  </SelectItem>
                                </SelectGroup>
                              </>
                            );
                          })}
                      </>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <div className='flex justify-center '>
          <p className='mt-20'>No hay nuevas keywords</p>
        </div>
      )}
    </div>
  );
};
