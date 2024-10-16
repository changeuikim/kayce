import CategorySection from '@/components/post/PostHeader/CategorySection';
import DateDisplay from '@/components/post/PostHeader/DateDisplay';
import TagSection from '@/components/post/PostHeader/TagSection';
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
      <CategorySection categories={post.categories} />
      <TagSection tags={post.tags} />
    </header>
  );
};

export default PostHeader;
