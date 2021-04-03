export const prependLeadingZero = (val: number): string => {
  if (!Number.isInteger(val)) {
    throw new Error('not an integer value');
  }

  if (val < 0) {
    throw new Error('Negative values not supported');
  }

  if (val < 10) {
    return `0${val}`;
  }

  return val.toString();
};

