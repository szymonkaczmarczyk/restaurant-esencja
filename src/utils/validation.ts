export const isValidPhone = (value: string) => /^(\+48|0048)?[0-9]{9}$/.test(value.replace(/[\s-]+/g, ''));

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
