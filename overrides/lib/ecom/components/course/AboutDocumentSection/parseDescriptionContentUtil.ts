export type ParsedDescriptionContent = {
  intro: string;
  points: string[];
};

export function parseDescriptionContentUtil(value?: string): ParsedDescriptionContent {
  const lines = (value || '').split('\n').map((line) => line.trim()).filter(Boolean);

  const [intro = '', ...restLines] = lines;
  const points = restLines
    .filter((line) => /^\s*-\s+/.test(line))
    .map((line) => line.replace(/^\s*-\s+/, '').trim())
    .filter(Boolean);

  return { intro, points };
}
