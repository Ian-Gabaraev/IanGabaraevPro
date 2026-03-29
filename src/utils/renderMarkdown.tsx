import { type ReactElement, type ReactNode } from 'react';

type ParsedTable = {
  header: string[];
  rows: string[][];
};

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const normalizeHref = (href: string): string => {
  if (href === 'quiz.html' || href.endsWith('/quiz.html')) {
    return '/quiz';
  }

  if (href.startsWith('./')) {
    return href.slice(1);
  }

  return href;
};

const renderInlineMarkdown = (text: string, keyPrefix: string): ReactNode[] => {
  const elements: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      elements.push(<code key={`${keyPrefix}-${match.index}`}>{match[1]}</code>);
    } else if (match[2] !== undefined) {
      elements.push(<strong key={`${keyPrefix}-${match.index}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      elements.push(<em key={`${keyPrefix}-${match.index}`}>{match[3]}</em>);
    } else if (match[4] !== undefined && match[5] !== undefined) {
      const href = normalizeHref(match[5]);
      const isExternal = /^https?:\/\//.test(href);
      elements.push(
        <a
          key={`${keyPrefix}-${match.index}`}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
};

const parseTableRow = (line: string): string[] => {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
};

const isTableDivider = (line: string): boolean => /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(line);

const isUnorderedListLine = (line: string): boolean => /^\s*-\s+/.test(line);
const isOrderedListLine = (line: string): boolean => /^\s*\d+\.\s+/.test(line);
const isHeadingLine = (line: string): boolean => /^#{1,6}\s+/.test(line);
const isHorizontalRule = (line: string): boolean => /^\s*---+\s*$/.test(line);

export const renderMarkdownContent = (content: string): ReactElement[] => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const elements: ReactElement[] = [];
  const headingCounts = new Map<string, number>();
  let index = 0;

  const createHeadingId = (rawText: string) => {
    const base = slugify(rawText) || 'section';
    const existing = headingCounts.get(base) ?? 0;
    headingCounts.set(base, existing + 1);
    return existing === 0 ? base : `${base}-${existing}`;
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed === '') {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      elements.push(
        <pre key={`code-${index}`} className="learn-code-block">
          <code className={language}>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    if (isHorizontalRule(line)) {
      elements.push(<hr key={`hr-${index}`} />);
      index += 1;
      continue;
    }

    if (isHeadingLine(line)) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const headingText = match[2].trim();
        const id = createHeadingId(headingText);
        const headingChildren = renderInlineMarkdown(headingText, `heading-${index}`);

        if (level === 1) {
          elements.push(<h1 key={`h1-${index}`} id={id}>{headingChildren}</h1>);
        } else if (level === 2) {
          elements.push(<h2 key={`h2-${index}`} id={id}>{headingChildren}</h2>);
        } else if (level === 3) {
          elements.push(<h3 key={`h3-${index}`} id={id}>{headingChildren}</h3>);
        } else if (level === 4) {
          elements.push(<h4 key={`h4-${index}`} id={id}>{headingChildren}</h4>);
        } else if (level === 5) {
          elements.push(<h5 key={`h5-${index}`} id={id}>{headingChildren}</h5>);
        } else {
          elements.push(<h6 key={`h6-${index}`} id={id}>{headingChildren}</h6>);
        }
      }

      index += 1;
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const table: ParsedTable = {
        header: parseTableRow(line),
        rows: [],
      };
      index += 2;

      while (index < lines.length && lines[index].includes('|') && lines[index].trim() !== '') {
        table.rows.push(parseTableRow(lines[index]));
        index += 1;
      }

      elements.push(
        <div key={`table-wrap-${index}`} className="learn-table-wrap">
          <table className="learn-table">
            <thead>
              <tr>
                {table.header.map((cell, cellIndex) => (
                  <th key={`th-${index}-${cellIndex}`}>{renderInlineMarkdown(cell, `th-${index}-${cellIndex}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={`tr-${index}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`td-${index}-${rowIndex}-${cellIndex}`}>
                      {renderInlineMarkdown(cell, `td-${index}-${rowIndex}-${cellIndex}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (isUnorderedListLine(line)) {
      const items: string[] = [];

      while (index < lines.length && isUnorderedListLine(lines[index])) {
        items.push(lines[index].replace(/^\s*-\s+/, ''));
        index += 1;
      }

      elements.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ul-item-${index}-${itemIndex}`}>
              {renderInlineMarkdown(item, `ul-${index}-${itemIndex}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (isOrderedListLine(line)) {
      const items: string[] = [];

      while (index < lines.length && isOrderedListLine(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }

      elements.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={`ol-item-${index}-${itemIndex}`}>
              {renderInlineMarkdown(item, `ol-${index}-${itemIndex}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''));
        index += 1;
      }

      elements.push(
        <blockquote key={`quote-${index}`}>
          <p>{renderInlineMarkdown(quoteLines.join(' '), `quote-${index}`)}</p>
        </blockquote>
      );
      continue;
    }

    if (trimmed.startsWith('<')) {
      const htmlLines: string[] = [];
      while (index < lines.length && lines[index].trim() !== '') {
        htmlLines.push(lines[index]);
        index += 1;
      }

      elements.push(
        <div key={`html-${index}`} dangerouslySetInnerHTML={{ __html: htmlLines.join('\n') }} />
      );
      continue;
    }

    const paragraphLines: string[] = [line];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() !== '' &&
      !lines[index].startsWith('```') &&
      !isHorizontalRule(lines[index]) &&
      !isHeadingLine(lines[index]) &&
      !isUnorderedListLine(lines[index]) &&
      !isOrderedListLine(lines[index]) &&
      !lines[index].trim().startsWith('>') &&
      !lines[index].trim().startsWith('<')
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    const paragraphText = paragraphLines.join(' ');
    elements.push(
      <p key={`p-${index}`}>
        {renderInlineMarkdown(paragraphText, `p-${index}`)}
      </p>
    );
  }

  return elements;
};

