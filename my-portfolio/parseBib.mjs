import fs from 'fs';
import { toJSON } from 'bibtex-parse-js';

const bibFileContent = fs.readFileSync('app/research/publication.bib', 'utf8');
const parsedBib = toJSON(bibFileContent);

fs.writeFileSync('app/research/parsedBib.json', JSON.stringify(parsedBib, null, 2));