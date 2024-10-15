import DateDisplay from '@/components/post/PostHeader/DateDisplay';
import MetadataSection from '@/components/post/PostHeader/MetadataSection';
import { Post } from '@/config/types';

type PostHeaderProps = {
  post: Post;
};

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <header className="mb-8 pb-4 border-b border-gray-200">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-black mb-2">{post.title}</h1>
        <DateDisplay date={post.date} modifiedDate={post.lastModified} />
      </div>
      <MetadataSection
        label="Category"
        items={[post.category]}
        getHref={(category) => `/category/${category}`}
      />
      <MetadataSection label="Tags" items={post.tags} getHref={(tag) => `/tags/${tag}`} />
    </header>
  );
};

export default PostHeader;
