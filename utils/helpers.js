module.exports = {
    format_date: date => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => amount !== 1 ? `${word}s` : word,
};
