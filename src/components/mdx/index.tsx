import type { MDXComponents } from 'mdx/types';
import CodeWrapper from '@/components/mdx/CodeWrapper';
import dynamic from 'next/dynamic';

const LanguageSelector = dynamic(() => import('@/components/mdx/LanguageSelector'), { ssr: false });

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
  LanguageSelector: LanguageSelector,
  CodeWrapper: CodeWrapper,
  hr: (props) => <hr className="my-4" {...props} />,
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

    if (isInline) {
      // 인라인 코드의 경우
      return (
        <code
          className="bg-red-50 text-black font-semibold rounded px-1.5 py-0.5 text-lg"
          {...props}
        />
      );
    } else {
      // 코드 블록의 경우
      return <code className="text-xl font-mono" {...props} />;
    }
  },
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-rose-700 bg-rose-100 p-4 my-4 rounded-r flex items-center"
      {...props}
    >
      <p className="m-0">{props.children}</p>
    </blockquote>
  ),
  a: (props) => <a className="hover:underline font-semibold" {...props} />,
};
