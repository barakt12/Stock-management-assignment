export function formatNumber(number: number, locale = 'en-US', options: Intl.NumberFormatOptions = {}): string {
    const formatter = new Intl.NumberFormat(locale, options);
    return formatter.format(number);
}