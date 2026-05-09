export const slugify = (title: string) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export const generateSKU = (title: string) => {
    const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const base = title.replace(/\s+/g, '-').toUpperCase().slice(0, 5); // 5-letter base
    return `${base}-${random}`
}