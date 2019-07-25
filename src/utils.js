module.exports.dateFormat = (date) => {
    if(!date){
        return null;
    }
    var date = new Date(date);
    var year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? " am" : " pm";

    return year + "-" + month + "-" + day + " " + hourFormatted + ":" +
        minuteFormatted + ":" + second + morning;
};

module.exports.apiBaseUrl = "http://10.0.1.80:8880/cms/";
