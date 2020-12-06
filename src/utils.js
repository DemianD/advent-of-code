import { readFile } from 'fs/promises';

export const read = async (path) => await readFile(`./src/${path}`, 'utf8');
