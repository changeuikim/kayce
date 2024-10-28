import { getPaginatedRecentPosts } from '@/lib/post';
import PostList from '@/components/post/PostList';
import PostPagination from '@/components/common/Pagination';

type Props = {
  params: { page: string };
};

const pageSize = 7;

const PostListPage = async ({ params: { page } }: Props) => {
  const { items: posts, currentPage, totalPages } = await getPaginatedRecentPosts(pageSize, page);

  return (
    <div className="p-4">
      <PostList title="전체 포스트" posts={posts} />
      <PostPagination currentPage={currentPage} totalPages={totalPages} basePath="/posts" />
    </div>
  );
};

export default PostListPage;

export async function generateStaticParams() {
  const { totalPages } = await getPaginatedRecentPosts(pageSize);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}
