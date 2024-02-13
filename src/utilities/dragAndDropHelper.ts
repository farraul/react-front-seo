import { SeoHeadingWithName } from 'src/models/seo';

export const handleDragStart = (event: React.DragEvent<HTMLElement>, word: string) => {
  event.dataTransfer.setData('word', word);
};

export const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
  event.preventDefault();
};

export const findHeading = (
  heading: SeoHeadingWithName,
  name: string,
  type: number,
): SeoHeadingWithName | null => {
  console.log('type:', type);
  console.log('name:', name);
  console.log('heading:', heading);
  console.log({ heading });

  if (heading.name === name && heading.type === type) {
    console.log('in');
    return heading;
  }

  console.log({ heading });

  for (const subheading of heading.headings) {
    console.log('subheading:', subheading);

    const result = findHeading(subheading, name, type);
    if (result) {
      console.log('result');
      return result;
    }
  }
  console.log('null');
  return null;
};

export const findKeyword = (
  heading: SeoHeadingWithName,
  name: string,
  type: number,
): SeoHeadingWithName | null => {
  console.log('type:', type);
  console.log('name:', name);
  console.log('heading:', heading);
  console.log({ heading });

  if (heading.name === name && heading.type === type) {
    console.log('in');
    return heading;
  }

  console.log({ heading });

  for (const subheading of heading.headings) {
    console.log('subheading:', subheading);

    const result = findHeading(subheading, name, type);
    if (result) {
      console.log('result');
      return result;
    }
  }
  console.log('null');
  return null;
};
