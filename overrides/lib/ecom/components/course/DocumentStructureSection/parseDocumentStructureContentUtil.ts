export type ParsedDocumentStructureSection = {
  title: string;
  pages: string;
  points: string[];
};

export function parseDocumentStructureContentUtil(value?: string): ParsedDocumentStructureSection[] {
  const lines = (value || '').split('\n').map((line) => line.trim()).filter(Boolean);

  return lines.reduce<ParsedDocumentStructureSection[]>((sections, line) => {
    if (line.startsWith('- ')) {
      sections.at(-1)?.points.push(line.slice(2));
    } else {
      const [title = '', pages = ''] = line.split(/ - (?=\d)/);
      sections.push({ title, pages, points: [] });
    }
    return sections;
  }, []);
}
