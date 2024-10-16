import ButtonLink from '@/components/common/ButtonLink';
import { TagSectionProps } from '@/config/types';

const TagSection = ({ tags }: TagSectionProps) => (
  <div className="flex flex-wrap gap-2 mb-4 items-center">
    <span className="font-semibold">Tags:</span>
    {tags.map((tag) => (
      <ButtonLink key={tag} href={`/tags/${tag}`} variant="outline" size="sm">
        {tag}
      </ButtonLink>
    ))}
  </div>
);

export default TagSection;
