import type { MDXComponents } from 'mdx/types';

export const listComponents: MDXComponents = {
  ul: (props) => <ul className="list-disc pl-6 pb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 pb-4" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
};
