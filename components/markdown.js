import { TypographyStylesProvider } from '@mantine/core';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

function removeNestedCodeBlocks(html) {
  return html
    .replace(/<pre><code(?: class="(.*?)")?>/g, '<pre class="$1">')
    .replace(/<\/code><\/pre>/g, '</pre>');
}

export default function Markdown({ value }) {
  return (
    <TypographyStylesProvider mt="md">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            removeNestedCodeBlocks(marked.parse(value))
          ),
        }}
      />
    </TypographyStylesProvider>
  );
}
