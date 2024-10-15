import type { MDXComponents } from 'mdx/types';

export const headingComponents: MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-black pb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold pb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold pb-4 " {...props} />,
  h4: (props) => <h4 className="text-xl font-medium pb-4" {...props} />,
  h5: (props) => <h5 className="text-lg font-normal pb-4" {...props} />,
  h6: (props) => <h6 className="text-base font-light pb-4" {...props} />,
};
