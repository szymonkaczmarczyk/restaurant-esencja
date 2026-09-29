// Polish phone number: 9 digits, optionally prefixed with +48 / 0048; spaces and dashes are ignored
export const isValidPhone = (value: string) => /^(\+48|0048)?[0-9]{9}$/.test(value.replace(/[\s-]+/g, ''));

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
