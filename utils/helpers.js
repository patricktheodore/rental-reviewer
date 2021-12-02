module.exports = {
    format_date: date => {
        date = new Date(date);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    format_plural: (word, amount) => amount !== 1 ? `${word}s` : word,

    // rating_average: rating => {
    //     var sum = 0;
    //     for( var i = 0; i < elmt.length; i++ ){
    //         sum += parseInt( elmt[i], 10 ); //don't forget to add the base
    //     }
        
    //     var avg = sum/elmt.length;
    // } 
};
