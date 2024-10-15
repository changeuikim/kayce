import { getPostBySlug, getPostPaths, parsePostMetaData } from '@/lib/post';
import PostBody from '@/components/post/PostBody';
import PostHeader from '@/components/post/PostHeader';

type Props = {
  params: { slug: string[] };
};

const PostPage = async ({ params: { slug } }: Props) => {
  const [category, ...restSlug] = slug;
  const post = await getPostBySlug(category, restSlug.join('/'));

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
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
  const postPaths = await getPostPaths();
  return postPaths.map((path) => {
    const { category, slug } = parsePostMetaData(path);
    return { slug: [category, ...slug.split('/')] };
  });
}
