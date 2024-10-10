import Link from '@/components/common/Link';
import { Post } from '@/config/types';

type PostListProps = {
  title: string;
  posts: Post[];
  showSummary?: boolean;
};

const PostList = ({ title, posts, showSummary = true }: PostListProps) => {
  return (
    <>
      <h1 className="text-4xl font-black pb-4">{title}</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={post.url} className="text-2xl font-bold hover:text-blue-600">
              {post.title}
            </Link>
            {showSummary && <p className="text-gray-600 mt-2">{post.summary}</p>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
