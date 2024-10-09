import Link from '@/components/common/Link';
import PostList from '@/components/post/PostList';
import { getRecentPostList } from '@/lib/post';

const HomePage = async () => {
  const recentPosts = await getRecentPostList();

  return (
    <main className="p-4">
      <PostList title="최근 게시물" posts={recentPosts} />
      <Link
        href="/posts"
        className="mt-8 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        모든 게시물 보기
      </Link>
    </main>
  );
};

export default HomePage;
