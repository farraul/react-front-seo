import UseAnimations from 'react-useanimations';
import settings from 'react-useanimations/lib/settings';

export const SettingsIcon = () => {
  return <UseAnimations strokeColor={'#fff'} animation={settings} size={20} />;
};
