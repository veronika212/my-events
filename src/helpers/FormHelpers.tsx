export const required = value => (value ? undefined : ' is required');
export const isNumber = value => (value && isNaN(Number(value)) ? 'Must be a number' : undefined);
