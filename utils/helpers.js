module.exports = {
    format_date: (date) => {
        const postDate = new Date()
        console.log(date)
        return `${postDate.getMonth()+1}/${postDate.getDate()}/${postDate.getFullYear()}`
    },
};