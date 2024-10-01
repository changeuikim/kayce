import fs from 'fs';
import path from 'path';

export default function Home() {
  const filePath = path.join(process.cwd(), 'README.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Markdown Content</h1>
      <pre className="whitespace-pre-wrap">{fileContents}</pre>
    </main>
  );
}