export const formattingDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    return `${dateObj.getDate()}.${formattedMonth}.${dateObj.getFullYear()}`;
}