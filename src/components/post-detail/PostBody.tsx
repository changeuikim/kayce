import { getSortedPosts } from '@/lib/post';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';

const PostBody = async () => {
  const sortedPostList = await getSortedPosts();
  const { title, content } = sortedPostList[9];

  return (
    <div className="p-4">
      <h1 className="text-4xl font-black pb-4">{title}</h1>
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
};

export default PostBody;
