import ButtonLink from '@/components/common/ButtonLink';

type MetadataSectionProps = {
  label: string;
  items: string[];
  getHref: (item: string) => string;
};

const MetadataSection = ({ label, items, getHref }: MetadataSectionProps) => (
  <div className="flex flex-wrap gap-2 mb-4 items-center">
    <span className="font-semibold">{label}:</span>
    {items.map((item) => (
      <ButtonLink key={item} href={getHref(item)} variant="outline" size="sm">
        {item}
      </ButtonLink>
    ))}
  </div>
);

export default MetadataSection;
