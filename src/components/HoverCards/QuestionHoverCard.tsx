import { ClassNames } from '@emotion/react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from 'src/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from 'src/components/ui/hover-card';

type color = 'yellow' | 'white' | 'black';

const QuestionHoverCard = ({
  color = 'white',
  size = 'h-5',
  children,
  className = '',
}: {
  children: any;
  color?: color;
  size?: string;
  className?: string;
}) => {
  return (
    <span className={`${className}`}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant='link' className={`p-0 ${size}`}>
            <img src={`/assets/images/icons/question${color}.svg`} className={size} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-1'>{children}</div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </span>
  );
};
export default QuestionHoverCard;
