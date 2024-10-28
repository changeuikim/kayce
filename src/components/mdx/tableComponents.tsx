import type { MDXComponents } from 'mdx/types';

export const tableComponents: MDXComponents = {
  table: (props) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-100" {...props} />,
  th: (props) => (
    <th
      className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900" {...props} />
  ),
};
