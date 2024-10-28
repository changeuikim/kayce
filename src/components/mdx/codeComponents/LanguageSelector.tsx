'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { languages } from '@/config/const';

const CustomLanguageSelector: React.FC = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    languages.map((lang) => lang.language)
  );

  useEffect(() => {
    const codeWrappers = document.querySelectorAll('.code-wrapper');
    codeWrappers.forEach((wrapper) => {
      const language = wrapper.getAttribute('data-language');
      if (selectedLanguages.includes(language || '')) {
        (wrapper as HTMLElement).style.display = 'block';
      } else {
        (wrapper as HTMLElement).style.display = 'none';
      }
    });
  }, [selectedLanguages]);

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language) ? prev.filter((lang) => lang !== language) : [...prev, language]
    );
  };

  const toggleAll = () => {
    setSelectedLanguages((prev) =>
      prev.length === languages.length ? [] : languages.map((lang) => lang.language)
    );
  };

  const isAllSelected = selectedLanguages.length === languages.length;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-md max-w-[200px]">
      <div className="flex flex-col space-y-2">
        {languages.map((lang) => (
          <Button
            key={lang.language}
            onClick={() => toggleLanguage(lang.language)}
            variant={selectedLanguages.includes(lang.language) ? 'default' : 'outline'}
            className={cn(
              'w-full justify-start',
              selectedLanguages.includes(lang.language) ? lang.color : 'bg-gray-100',
              selectedLanguages.includes(lang.language) ? 'text-white' : 'text-gray-700'
            )}
          >
            {lang.name}
          </Button>
        ))}
        <Button
          onClick={toggleAll}
          variant={isAllSelected ? 'default' : 'outline'}
          className={cn(
            'w-full justify-start',
            isAllSelected ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
          )}
        >
          모두
        </Button>
      </div>
    </div>
  );
};

export default CustomLanguageSelector;
