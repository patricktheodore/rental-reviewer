module.exports = {
    format_date: date => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => amount !== 1 ? `${word}s` : word,

    rating_average: reviews => {
        let sum = 0;
        
        for( var i = 0; i < reviews.length; i++ ){
            sum += reviews[i].rating; 
        }
        
        let avg = sum/reviews.length;
        return avg
    } 
};
