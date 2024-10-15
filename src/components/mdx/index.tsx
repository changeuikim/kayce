import type { MDXComponents } from 'mdx/types';
import dynamic from 'next/dynamic';
import { headingComponents } from '@/components/mdx/headingComponents';
import { textComponents } from '@/components/mdx/textComponents';
import { listComponents } from '@/components/mdx/listComponents';
import { codeComponents } from '@/components/mdx/codeComponents';
import { tableComponents } from '@/components/mdx/tableComponents';
import { miscComponents } from '@/components/mdx/miscComponents';

const LanguageSelector = dynamic(() => import('@/components/mdx/codeComponents/LanguageSelector'), {
  ssr: false,
});

export const mdxComponents: MDXComponents = {
  ...headingComponents,
  ...textComponents,
  ...listComponents,
  ...codeComponents,
  ...tableComponents,
  ...miscComponents,
  LanguageSelector,
};
