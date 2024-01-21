import locaties from 'src/configs/locaties.json';
import { useEffect, useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { Controller } from 'react-hook-form';

export default function LocationsAutocomplete({
  provinceSelected,
  isDisabled,
  setSearch,
  field,
}: any) {
  console.log({ field });
  let locatiesFormatted: any = [];
  const locatiesMap = locaties as any;

  if (provinceSelected) {
    locatiesFormatted = locatiesMap[provinceSelected].map((location: any) => {
      return location.label;
    });
  }

  return (
    <div>
      <Autocomplete
        required
        placeholder='Localidad'
        id='country-select-demo'
        disabled={isDisabled}
        onInputChange={(_e, newInputValue) => {
          {
            console.log('www', newInputValue);
            field
              ? field.onChange(newInputValue)
              : setSearch((prev: any) => ({ ...prev, location: newInputValue }));
          }
        }}
        options={locatiesFormatted}
        sx={{
          '&.Mui-disabled': {
            background: ' ',
            color: '',
            fontWeight: '',
            opacity: 0.5,
            cursor: '',
          },
          color: 'black',
        }}
      />
      {/* )}
      /> */}
    </div>
  );
}
