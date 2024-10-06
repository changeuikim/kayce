import { getPostPaths } from '@/lib/post';
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';

const PostBody = async () => {
  const filePaths = await getPostPaths();
  const filePath = filePaths[7];
  const fileContents = await fs.readFile(path.join(filePath, 'content.mdx'), 'utf-8');
  const { data, content } = matter(fileContents);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-black pb-4">{data.title}</h1>
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
};

export default PostBody;
