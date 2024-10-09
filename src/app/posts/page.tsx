import { getPaginatedPostList } from '@/lib/post';
import Pagination from '@/components/common/Pagination';
import PostList from '@/components/post/PostList';

const PostListPage = async ({ searchParams }: { searchParams: { page: string } }) => {
  const page = parseInt(searchParams.page, 10) || 1;
  const { posts, totalPages } = await getPaginatedPostList(page);

  return (
    <div className="p-4">
      <PostList title="전체 포스트" posts={posts} />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  );
};

export default PostListPage;
