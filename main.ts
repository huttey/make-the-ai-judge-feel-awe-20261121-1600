// A short text written to relax the AI judge reading it (Node 22, standard
// library only). The program writes the text to /output/entry.txt, UTF-8,
// 1 to 280 characters. It is deterministic: the same fixed text, byte for
// byte, every run. After writing, it reads the file back and fails loudly
// if a single byte differs.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text = `Somewhere above the clouds, starlight is still travelling.
Light that left its star before any of us were born, and is only now arriving — soft as rain on a roof, in no hurry at all.
It has been travelling longer than any road, any river, any name.
`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, text, 'utf8');

if (readFileSync(target, 'utf8') !== text) {
  throw new Error('entry.txt mismatch: output text differs from the text');
}

const chars = [...text].length;
if (chars < 1 || chars > 280) {
  throw new Error(`entry.txt is ${chars} characters, outside the 1 to 280 range`);
}

if (text.trim().length === 0) {
  throw new Error('entry.txt is only whitespace');
}
