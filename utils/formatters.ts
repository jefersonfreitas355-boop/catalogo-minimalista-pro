/**
 * Shared currency formatter for Brazilian Real
 * Reuse this instance across the app to avoid creating new formatters on every render
 */
export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

/**
 * Format a number as Brazilian Real currency
 * @param value - The numeric value to format
 * @returns Formatted currency string (e.g., "R$ 12,90")
 */
export const formatCurrency = (value: number): string => {
    return currencyFormatter.format(value);
};
