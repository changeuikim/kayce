import { promises as fs } from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { mdxComponents } from '@/components/mdx';

const Category = async () => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'posts',
    'restrospective',
    'infra-provisioning.mdx'
  );
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(fileContents);

  return (
    <main className="p-4">
      <h1 className="text-4xl font-black pb-4">{data.title}</h1>
      <MDXRemote source={content} components={mdxComponents} />
    </main>
  );
};

export default Category;
