import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';
import { Post } from '@/config/types';

type PostBodyProps = {
  post: Post;
};

const PostBody = ({ post }: PostBodyProps) => {
  return (
    <article className="p-4">
      <h1 className="text-4xl font-black pb-4">{post.title}</h1>
      <MDXRemote source={post.content} components={mdxComponents} />
    </article>
  );
};

export default PostBody;
