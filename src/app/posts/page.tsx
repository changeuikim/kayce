import Link from '@/components/common/Link';
import { getPaginatedPostList } from '@/lib/post';
import Pagination from '@/components/common/Pagination';

const PostListPage = async ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page, 10) || 1;
  const { posts, totalPages } = await getPaginatedPostList(page);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-black pb-4">전체 포스트</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={post.url} className="text-2xl font-bold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">{post.summary}</p>
          </li>
        ))}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  );
};

export default PostListPage;
