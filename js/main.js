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
    new Day('Mon', 22, 'north-west', 10, 'sunnny'),
    new Day('Tue', 14, 'north', 14, 'rainy'),
    new Day('Wed', 14, 'north-east', 14, 'rainy'),
    new Day('Thu', 14, 'east', 14, 'rainy'),
    new Day('Fri', 14, 'south-east', 14, 'rainy'),
    new Day('Sat', 14, 'south', 14, 'rainy'),
    new Day('Sun', 14, 'south-west', 14, 'rainy'),
]

const root = $(".root");
const daysWrapper = $(".days-wrapper");

const weatherData = {
    tempUnit: 'C',
    windSpeedUnit: 'm / s',
}

showDays = () => {
    days.forEach(el => {
        let clickableBox = $("<div>").addClass("clickable");
        let dayTxt = $("<h3>").text(el.day);
        let dayTemp = $("<h5>").text(el.temp);
        let tempUnit = $("<p>").text(weatherData.tempUnit);
        clickableBox.append(dayTxt);
        clickableBox.append(dayTemp);
        clickableBox.append(tempUnit);
        daysWrapper.append(clickableBox);
        clickableBox.on("click", () => {
            $(".widget-wrapper").remove();
            openWidget(el);
        });
    });
}

pickClass = element => {
    if (element.windDirection === "west") {
        return "west"
    } else if (element.windDirection === "north") {
        return "north"
    } else if (element.windDirection === "south") {
        return "south"
    } else if (element.windDirection === "north-west") {
        return "north-west"
    } else if (element.windDirection === "north-east") {
        return "north-east"
    } else if (element.windDirection === "south-east") {
        return "south-east";
    } else if (element.windDirection === "south-west") {
        return "south-west"
    }
}

openWidget = element => {
    const widgetWrapper = $("<div>").addClass("widget-wrapper");
    const dayNameWrapper = $("<div>").addClass("day-name-wrapper wrapper");
    const dayNameTxt = $("<div>").addClass("day-name-text").text(element.day)

    const tempWrapper = $("<div>").addClass("temp-wrapper wrapper");
    const currentTemp = $("<h3>").addClass("current-temp").text(element.temp);
    const unitWrapper = $("<div>").addClass("unit-wrapper").text(weatherData.tempUnit);

    const windSpeedWrapper = $("<div>").addClass("wind-speed-wrapper wrapper");
    const windSpeed = $("<div>").addClass("wind-speed").text(element.windSpeed);
    const windSpeedUnit = $("<h3>").addClass("wind-speed-unit").text(weatherData.windSpeedUnit);

    const windDirectionWrapper = $("<div>").addClass("wind-direction-wrapper wrapper");
    const windDirection = $("<div>").addClass("wind-direction").text(element.windDirection);
    const windDirectionArrow = $("<div>").addClass("wind-direction-arrow");
    const arrowImage = $("<img>").attr("src", "img/arrow.png").addClass(pickClass(element))

    const typeWrapper = $("<div>").addClass("type-wrapper wrapper");
    const typeText = $("<h3>").text(element.type)

    dayNameWrapper.append(dayNameTxt);
    tempWrapper.append(currentTemp);
    tempWrapper.append(unitWrapper);
    windSpeedWrapper.append(windSpeed)
    windSpeedWrapper.append(windSpeedUnit);
    windDirectionWrapper.append(windDirection);
    windDirectionArrow.append(arrowImage);
    windDirectionWrapper.append(windDirectionArrow);
    typeWrapper.append(typeText);

    widgetWrapper.append(dayNameWrapper);
    widgetWrapper.append(tempWrapper);
    widgetWrapper.append(windSpeedWrapper);
    widgetWrapper.append(windDirectionWrapper);
    widgetWrapper.append(typeWrapper);
    root.append(widgetWrapper);
    widgetWrapper.fadeIn(500);
    widgetWrapper.css("display", "flex");
}



showDays();