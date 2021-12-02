module.exports = {
    format_date: date => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => amount !== 1 ? `${word}s` : word,

    rating_average: property => {
        let sum = 0;
        
        for( var i = 0; i < property.reviews.length; i++ ){
            sum += property.reviews[i].rating; 
        }
        
        let avg = sum/property.reviews.length;
        return avg
    } 
};
