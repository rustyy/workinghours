import { prependLeadingZero } from './utils';

describe('utils', () => {
  describe('prependLeadingZero()', () => {
    it('attaches leading zero to 1', () => {
      expect(prependLeadingZero(1)).toBe('01');
    });

    it('returns "10" for value 10', () => {
      expect(prependLeadingZero(10)).toBe('10');
    });

    it('throws an error for negative value', () => {
      expect(() => prependLeadingZero(-1)).toThrow(new Error('Negative values not supported'));
    });

    it('throws an error for floating point value', () => {
      expect(() => prependLeadingZero(1.1)).toThrow(new Error('not an integer value'));
    });
  });
});
