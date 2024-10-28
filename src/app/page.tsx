import PostList from '@/components/post/PostList';
import { getPaginatedRecentPosts } from '@/lib/post';
import ButtonLink from '@/components/common/ButtonLink';

const HomePage = async () => {
  const { items: recentPosts } = await getPaginatedRecentPosts(7);

  return (
    <main className="p-4">
      <PostList title="최근 게시물" posts={recentPosts} />
      <ButtonLink href="/posts" className="mt-8" variant="default">
        모든 게시물 보기
      </ButtonLink>
    </main>
  );
};

export default HomePage;
