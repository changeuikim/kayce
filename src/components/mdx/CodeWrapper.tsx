import { languages } from '@/config/const';
import React from 'react';

interface CodeWrapperProps {
  children: React.ReactNode;
  title?: string;
}

const CodeWrapper: React.FC<CodeWrapperProps> = ({ children, title }) => {
  const preElement = children as React.ReactElement;
  const codeElement = preElement.props.children as React.ReactElement;
  const languageKey = codeElement.props['data-language'];
  const languageObj = languages.find((lang) => lang.language === languageKey);
  const languageName = languageObj ? languageObj.name : languageKey;

  return (
    <div className={`code-wrapper mb-4`} data-language={languageKey} style={{ display: 'block' }}>
      <h4 className="text-xl font-medium pb-2">{title || `${languageName}`}</h4>
      {children}
    </div>
  );
};

export default CodeWrapper;
