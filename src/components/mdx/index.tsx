import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-black pb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold pb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold pb-4 " {...props} />,
  h4: (props) => <h4 className="text-xl font-medium pb-4" {...props} />,
  h5: (props) => <h5 className="text-lg font-normal pb-4" {...props} />,
  h6: (props) => <h6 className="text-base font-light pb-4" {...props} />,
  p: (props) => <p className="text-lg mb-4" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 pb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 pb-4" {...props} />,
  hr: (props) => <hr className="my-4" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-rose-700 bg-rose-100 p-4 my-4 rounded-r flex items-center"
      {...props}
    >
      <p className="m-0">{props.children}</p>
    </blockquote>
  ),
  pre: (props) => <pre className="bg-amber-50 rounded-md p-4 overflow-x-auto my-4" {...props} />,
  code: ({ className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return (
      <code className={`${match ? `language-${match[1]}` : ''} text-sm font-mono`} {...props} />
    );
  },
  a: (props) => <a className="hover:underline font-semibold" {...props} />,
};
