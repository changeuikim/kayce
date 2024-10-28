import type { MDXComponents } from 'mdx/types';
import CodeWrapper from '@/components/mdx/codeComponents/CodeWrapper';

export const codeComponents: MDXComponents = {
  pre: (props) => (
    <CodeWrapper>
      <pre
        className="rounded-md p-4 overflow-x-auto my-4 whitespace-pre-wrap bg-gray-100"
        {...props}
      />
    </CodeWrapper>
  ),
  code: (props) => {
    const isInline = typeof props.children === 'string';
    return isInline ? (
      <code
        className="bg-red-50 text-black font-semibold rounded px-1.5 py-0.5 text-lg"
        {...props}
      />
    ) : (
      <code className="text-xl font-mono" {...props} />
    );
  },
};
