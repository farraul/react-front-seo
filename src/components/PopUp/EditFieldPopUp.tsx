import { useState } from 'react';
import { Button } from 'src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import { Company } from 'src/models/user/user';
import { setCredentials } from 'src/store/user/userSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

export const EditFieldPopUp = ({ listDataProfile }: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector<Company>((state) => state.user.userInfo);
  const [profile, setProfile] = useState<Company>(user);
  const [fieldEdit, setFieldEdit] = useState('');

  function handleChange(e: any) {
    const value = e.target.value;
    setProfile({ ...profile, [e.target.name]: value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(setCredentials(profile));
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Editar perfil</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Modifica el campo</DialogTitle>
            <DialogDescription>El email no se puede modificar.</DialogDescription>
          </DialogHeader>

          <Select
            onValueChange={(e) => {
              console.log('sss');
              setFieldEdit(e);
            }}
          >
            <SelectTrigger className='w-[100%] bg-white'>
              <SelectValue placeholder='Selecciona un campo' />
            </SelectTrigger>

            <SelectContent>
              {listDataProfile.map((field: any) => (
                <SelectItem key={field.label} value={field.title}>
                  {field.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldEdit && (
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Nombre
                </Label>
                <Input
                  id='name'
                  name='name'
                  placeholder={fieldEdit}
                  className='col-span-3'
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <DialogFooter onClick={handleSubmit}>
            <DialogClose>
              <p className='btn-secondary'>Save changes</p>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
