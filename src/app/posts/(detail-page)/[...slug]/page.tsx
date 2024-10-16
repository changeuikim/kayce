import { getAllPosts, getPostBySlug } from '@/lib/post';
import PostBody from '@/components/post/PostBody';
import PostHeader from '@/components/post/PostHeader';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string[] };
};

const PostPage = async ({ params: { slug } }: Props) => {
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="p-4">
      <PostHeader post={post} />
      <PostBody post={post} />
    </article>
  );
};

export default PostPage;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: [...post.url.split('/').slice(2)],
  }));
}
