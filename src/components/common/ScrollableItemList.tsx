import React from 'react';
import ButtonLink from '@/components/common/ButtonLink';
import clsx from 'clsx';
import { ScrollableItemListProps } from '@/config/types';

const ScrollableItemList: React.FC<ScrollableItemListProps> = ({
  currentItem,
  items,
  basePath,
}) => {
  return (
    <div className="max-h-[15vh] overflow-y-auto scrollbar-hide p-4">
      <div className="flex flex-wrap gap-2">
        {items.map(({ item, type }) => (
          <ButtonLink
            key={item}
            href={`${basePath}/${item}`}
            variant={item === currentItem ? 'default' : 'outline'}
            className={clsx(
              'mb-2',
              item === currentItem && 'bg-primary text-primary-foreground hover:bg-primary/90',
              item !== currentItem && {
                'bg-background text-foreground': true,
                'bg-rose-800 text-white hover:bg-rose-900': type === 'large',
              }
            )}
          >
            {item}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
};

export default ScrollableItemList;
