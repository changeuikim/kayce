import type { MDXComponents } from 'mdx/types';

export const miscComponents: MDXComponents = {
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-rose-700 bg-rose-100 p-4 my-4 rounded-r flex items-center"
      {...props}
    >
      <p className="m-0">{props.children}</p>
    </blockquote>
  ),
  hr: (props) => <hr className="my-4" {...props} />,
};
