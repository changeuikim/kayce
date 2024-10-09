import Link from '@/components/common/Link';
import { getRecentPostList } from '@/lib/post';

const HomePage = async () => {
  const recentPosts = await getRecentPostList();

  return (
    <main className="p-4">
      <h1 className="text-4xl font-black pb-4">최근 게시물</h1>
      <ul className="space-y-4">
        {recentPosts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={post.url} className="text-2xl font-bold hover:text-blue-600">
              {post.title}
            </Link>
            <p className="text-gray-600 mt-2">{post.summary}</p>
          </li>
        ))}
      </ul>
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
