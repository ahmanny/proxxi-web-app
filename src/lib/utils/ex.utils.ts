export const calculateTotal = (data: { total: number }[]): number => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
    return total;
};
