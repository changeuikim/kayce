import ButtonLink from '@/components/common/ButtonLink';
import { CategorySectionProps } from '@/config/types';

const CategorySection = ({ categories }: CategorySectionProps) => (
  <div className="flex flex-wrap gap-2 mb-4 items-center">
    <span className="font-semibold">Category:</span>
    {categories.map((category) => (
      <ButtonLink
        key={category.name}
        href={`/category/${category.name}`}
        variant="outline"
        size="sm"
      >
        {category.name}
      </ButtonLink>
    ))}
  </div>
);

export default CategorySection;
