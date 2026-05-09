import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
};


dayjs.extend(relativeTime);
export function formatRelativeDate(dateString: string) {
    const date = dayjs(dateString);
    const now = dayjs();
    const diffInDays = now.diff(date, 'day');

    if (diffInDays < 1) return 'Today';
    if (diffInDays < 7) return 'Last week';
    if (diffInDays < 30) return 'Last month';

    return date.fromNow();
}
