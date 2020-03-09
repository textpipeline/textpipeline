import Decimal from 'decimal.js';

import { decimalJsLight } from '../../oss';
import { Transform } from '../types';

const containsNonBinary = (suspect: string): boolean => /[^0-1]+/.test(suspect);

const csvToXls: Transform = {
  name: 'Binary To Decimal',
  slug: 'binary-to-decimal',
  inputType: 'Binary',
  outputType: 'Decimal',
  project: decimalJsLight,
  defaultOutput: '0',
  execute: async input => {
    if (!input) {
      throw new Error('No input detected.');
    }

    const sanitized = input.replace(/\s+/g, '');

    if (sanitized === '') {
      throw new Error('No input detected.');
    }

    if (containsNonBinary(sanitized)) {
      throw new Error('Invalid binary input.');
    }

    const decimal = new Decimal(`0b${sanitized}`);
    return decimal.toFixed(0);
  },
};

export default csvToXls;
