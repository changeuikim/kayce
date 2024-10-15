import type { MDXComponents } from 'mdx/types';

export const textComponents: MDXComponents = {
  p: (props) => <p className="text-lg mb-4" {...props} />,
  a: (props) => <a className="hover:underline font-semibold" {...props} />,
};
