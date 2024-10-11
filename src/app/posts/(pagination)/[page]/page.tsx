import { getPaginatedPostList } from '@/lib/post';
import PostList from '@/components/post/PostList';
import PostPagination from '@/components/post/PostPagination';

type Props = {
  params: { page: string };
};

const PostListPage = async ({ params }: Props) => {
  const page = parseInt(params.page, 10) || 1;
  const { posts, totalPages } = await getPaginatedPostList(page);

  return (
    <div className="p-4">
      <PostList title="전체 포스트" posts={posts} />
      <PostPagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  );
};

export default PostListPage;

export async function generateStaticParams() {
  const { totalPages } = await getPaginatedPostList(1);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}
