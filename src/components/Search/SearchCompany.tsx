import { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

import communities from 'src/configs/communities.json';
import provinces from 'src/configs/provinces.json';
import LocationsAutoComplete from 'src/components/Autocomplete/LocationAutocomplete';

interface SearchCompany {
  community: string;
  province: string;
  location: string;
}

const initialState: SearchCompany = {
  community: '',
  province: '',
  location: '',
};

type Inputs = {
  email: string;
  password: string;
  community: string;
  province: string;
};
export const SearchCompany = ({ setSearchSelected }: any) => {
  const [ubication, setUbication] = useState({
    community: '',
    province: '',
  });
  console.log({ ubication });
  const [isDisabled, setIsDisabled] = useState({
    province: true,
    location: true,
  });
  const { control } = useForm<any>({
    defaultValues: initialState,
  });

  return (
    <div className='flex justify-center '>
      <div className='flex max-w-7xl items-center justify-center gap-x-6'>
        <div className='text-2xl font-bold'>Busca empresa de socorrismo</div>
        <div className='flex flex-row gap-x-2'>
          <div>
            <Controller
              name='community'
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              }}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Select
                      required
                      onValueChange={(e) => {
                        setIsDisabled({ province: false, location: true });
                        setUbication({ community: e, province: '' });

                        const nameCommunitySelected = communities.filter(
                          (comunity) => comunity.code === e,
                        )[0].label;
                        field.onChange(nameCommunitySelected);
                        setSearchSelected({
                          community: nameCommunitySelected,
                          province: '',
                          location: '',
                        });
                      }}
                    >
                      <SelectTrigger className='w-[100%] bg-white'>
                        <SelectValue placeholder='Comunidad autonóma' />
                      </SelectTrigger>

                      <SelectContent>
                        {communities.map((community) => (
                          <SelectItem key={community.label} value={community.code}>
                            {community.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error?.message && (
                      <p className='mt-3 ml-1 text-xs text-red-500 self-start '>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <div className=''>
            <Controller
              name='province'
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido',
                },
              }}
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Select
                      required
                      disabled={isDisabled.province}
                      onValueChange={(e) => {
                        const nameProvinceSelected = provinces.filter((province) => {
                          return province.code === e;
                        })[0].label;

                        field.onChange(nameProvinceSelected);
                        setIsDisabled({ ...isDisabled, location: false });
                        setUbication((prev) => ({ ...prev, province: e, location: '' }));
                        setSearchSelected((prev: any) => ({
                          ...prev,
                          province: nameProvinceSelected,
                          location: '',
                        }));
                      }}
                    >
                      <SelectTrigger className='w-[100%] bg-white'>
                        <SelectValue placeholder='Provincias' />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => {
                          if (province.parent_code === ubication.community) {
                            return (
                              <SelectItem key={province.label} value={province.code}>
                                {province.label}
                              </SelectItem>
                            );
                          }
                        })}
                      </SelectContent>
                    </Select>

                    {fieldState.error?.message && (
                      <p className='mt-3 ml-1 text-xs text-red-500 self-start '>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                );
              }}
            />
          </div>
          <LocationsAutoComplete
            setSearch={setSearchSelected}
            provinceSelected={ubication.province}
            isDisabled={isDisabled.location}
            control={control}
          />
        </div>
      </div>
    </div>
  );
};
