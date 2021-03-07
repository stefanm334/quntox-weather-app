class Day {
    day;
    temp;
    windDirection;
    windSpeed;
    type;
    constructor(day, temp, windDirection, windSpeed, type) {
        this.day = day;
        this.temp = temp;
        this.windDirection = windDirection;
        this.windSpeed = windSpeed;
        this.type = type;
    }
}

const days = [
    new Day('Mon', 22, 'north - east', 10, 'sunnny'),
    new Day('Tue', 14, 'north - west', 14, 'rainy'),
    new Day('Wed', 14, 'north - west', 14, 'rainy'),
    new Day('Thu', 14, 'north - west', 14, 'rainy'),
    new Day('Fri', 14, 'north - west', 14, 'rainy'),
    new Day('Sat', 14, 'north - west', 14, 'rainy'),
    new Day('Sun', 14, 'north - west', 14, 'rainy'),
]

const daysWrapper = $(".days-wrapper");

const weatherData = {
    tempUnit: 'C',
    windSpeedUnit: 'm / s',
}

showDays = () => {
    days.forEach(el => {
        let clickableBox = $("<div>").attr("class", "clickable");
        let dayTxt = $("<h3>").text(el.day);
        let dayTemp = $("<h5>").text(el.temp);
        let tempUnit = $("<p>").text(weatherData.tempUnit);
        clickableBox.append(dayTxt);
        clickableBox.append(dayTemp);
        clickableBox.append(tempUnit);
        daysWrapper.append(clickableBox);
    });
}



showDays();