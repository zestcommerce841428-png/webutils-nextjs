import { redirect } from 'next/navigation';

// List of completed tools (31 total - Day 1 Complete!)
const completedTools = [
  'tools/dev/json-formatter',
  'tools/dev/base64',
  'tools/dev/url-codec',
  'tools/dev/hash-generator',
  'tools/dev/uuid-generator',
  'tools/dev/color-converter',
  'tools/dev/timestamp',
  'tools/dev/regex-tester',
  'tools/dev/css-formatter',
  'tools/dev/sql-formatter',
  'tools/dev/markdown-preview',
  'tools/dev/html-entity',
  'tools/dev/number-base-converter',
  'tools/dev/ip-subnet-calculator',
  'tools/generator/password-generator',
  'tools/generator/random-number-generator',
  'tools/generator/qr-code-generator',
  'tools/text/lorem-ipsum',
  'tools/text/word-counter',
  'tools/text/text-diff',
  'tools/text/case-converter',
  'tools/text/string-escaper',
  'tools/text/text-sorter',
  'tools/text/text-replacer',
  'tools/text/text-to-speech',
  'tools/text/slug-generator',
  'tools/text/duplicate-line-remover',
  'tools/converter/file-size-converter',
  'tools/converter/percentage-calculator',
  'tools/converter/temperature-converter',
  'tools/converter/time-converter',
];

export default function ToolsCatchAll({
  params,
}: {
  params: { slug: string[] };
}) {
  const toolPath = `tools/${params.slug.join('/')}`;
  
  // Check if this tool is completed
  const isCompleted = completedTools.includes(toolPath);
  
  if (!isCompleted) {
    // Redirect to coming soon page
    redirect('/coming-soon');
  }
  
  // If somehow we get here (shouldn't happen), redirect to home
  redirect('/');
}
