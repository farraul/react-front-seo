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
  if (heading.name === name && heading.type === type) {
    return heading;
  }

  for (const subheading of heading.headings) {
    const result = findHeading(subheading, name, type);
    if (result) {
      return result;
    }
  }

  return null;
};
