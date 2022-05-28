import { Title, Text, TypographyStylesProvider } from '@mantine/core';
import Layout from 'components/layout';

export default function MarkdownGuide() {
  return (
    <Layout title="Markdown Guide">
      <Title>Markdown Guide</Title>
      <Text color="dimmed">
        Learn the basics of Markdown to write better tutorials.
      </Text>
      <TypographyStylesProvider>
        <h2>Headings</h2>
        <p>You can add different sizes of headings with the # symbol:</p>
        <pre>
          {`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
        </pre>
        <p>
          You should try to use them for sections. E.g. heading 3 for a section
          inside of a section starting with heading 2:
        </p>
        <pre>
          {`## My awesome guide
Your text here...

### Step 1
etc.
`}
        </pre>

        <h2>Text Styles</h2>
        <p>
          Text styles like <i>italic</i>, <strong>bold</strong>, and{' '}
          <del>strikethrough</del> can also be used in Markdown:
        </p>
        <pre>
          {`This is *italic* and this is **bold**. This is ~~strikethrough~~.`}
        </pre>
        <p>
          Code blocks are also possible, and so is <code>inline code</code>.
        </p>
        <pre>
          {`Here's some code: \`alert('Hello!');\`

\`\`\`
function codeBlock() {
  console.log('This is a code block.');
}
\`\`\`
`}
        </pre>

        <h2>Links</h2>
        <p>
          Links are easy to create in Markdown, and Scratch Tutorials also gives
          you some shortcuts:
        </p>
        <pre>
          {`Here's a link to [Scratch](https://scratch.mit.edu).

Visit [tutorial number 1](id:1) and user [NFlex23](user:NFlex23).
`}
        </pre>

        <h2>Images</h2>
        <p>
          Images have almost the same syntax as links, but they have a{' '}
          <code>!</code> before them:
        </p>
        <pre>
          {`Here's the Scratch logo: ![Scratch logo](https://scratch.mit.edu/images/logo_sm.png)`}
        </pre>

        <h2>Lists</h2>
        <p>You can use ordered, unordered, and nested lists in Markdown:</p>
        <pre>
          {`Ordered list:
1. First item
2. Second item
3. Third item

Unordered list:
- First item
- Second item
- Third item

You can also use \`*\` for unordered lists:
* First item
* Second item
* Third item

Lists can be nested:
- First item
  - Subitem 1
  - Subitem 2
- Second item
  1. Subitem 1
  2. Subitem 2
`}
        </pre>
        <p>
          Make sure to add a newline after each list or the text after them will
          be indented.
        </p>

        <h2>HTML Tags</h2>
        <p>
          Markdown also allows you to use a bunch of HTML tags. They won't be
          listed here, but you can try tags out to see if they work. Also note
          that iframes will only work if they are from Scratch.
        </p>
      </TypographyStylesProvider>
    </Layout>
  );
}
