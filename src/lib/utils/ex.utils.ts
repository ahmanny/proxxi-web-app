export const calculateTotal = (data: { total: number }[]): number => {
    console.log(data);
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((sum, item) => sum + (item.total || 0), 0);
    console.log(total);
    return total;
};
