import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';
import { Post } from '@/config/types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

type PostBodyProps = {
  post: Post;
};

const PostBody = ({ post }: PostBodyProps) => {
  return (
    <article className="p-4">
      <h1 className="text-4xl font-black pb-4">{post.title}</h1>
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: 'github-dark' }]],
          },
        }}
      />
    </article>
  );
};

export default PostBody;
