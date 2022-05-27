import { TypographyStylesProvider } from '@mantine/core';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

marked.use({ walkTokens });

DOMPurify.addHook('uponSanitizeElement', (node, data) => {
  if (data.tagName === 'iframe') {
    const src = node.getAttribute('src') || '';
    if (!src.startsWith('https://scratch.mit.edu/')) {
      return node.parentNode?.removeChild(node);
    }
  }
});

function walkTokens(token) {
  if (token.type === 'link') {
    let match;

    if ((match = token.href.match(/^id:(\d+)$/))) {
      token.href = `/tutorials/id/${match[1]}`;
    } else if ((match = token.href.match(/^user:([a-zA-Z0-9-_]+)$/))) {
      token.href = `/tutorials/user/${match[1]}`;
    }
  }
}

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
            removeNestedCodeBlocks(marked.parse(value)),
            {
              ADD_TAGS: ['iframe'],
              ADD_ATTR: ['allowtransparency', 'frameborder', 'scrolling'],
            }
          ),
        }}
      />
    </TypographyStylesProvider>
  );
}
