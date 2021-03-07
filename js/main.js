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
    new Day("Mon", 22, "north-west", 10, "sunnny"),
    new Day("Tue", 14, "north", 14, "rainy"),
    new Day("Wed", 14, "north-east", 14, "rainy"),
    new Day("Thu", 14, "east", 14, "rainy"),
    new Day("Fri", 14, "south-east", 14, "rainy"),
    new Day("Sat", 14, "south", 14, "rainy"),
    new Day("Sun", 14, "south-west", 14, "rainy"),
];

const root = $(".root");
const daysWrapper = $(".days-wrapper");
let tempUnitType = "C";
let windSpeedUnitType = "m/s"
let switcher = $(".switcher");
let ball = $(".ball");
let selectedElement = {};

const weatherData = {
    tempUnit: "C",
    windSpeedUnit: "m/s",
};

convertTemp = temp => {
    if (tempUnitType === "C") {
        return temp;
    } else if (tempUnitType === "K") {
        temp = temp - 273.15;
        return temp;
    }
};

convertWindSpeedUnitType = () => {
    if (windSpeedUnitType === "m/s") {
        windSpeedUnitType = "km/h";
    } else {
        windSpeedUnitType = "m/s"
    }
    $(".widget-wrapper").remove();
    openWidget(selectedElement);
}

calcWindSpeed = windSpeed => {
    if (windSpeedUnitType === "m/s") {
        return windSpeed * 3.6;
    }
    return windSpeed;
}

switchTempUnit = () => {
    daysWrapper.empty();
    if (tempUnitType === "C") {
        tempUnitType = "K";
        ball.css("left", "auto");
        ball.css("right", "5px");
        $(".widget-wrapper").remove();
        showDays();
        if (JSON.stringify(selectedElement) !== "{}") {
            openWidget(selectedElement);
        }
    } else {
        tempUnitType = "C";
        ball.css("right", "auto");
        ball.css("left", "5px");
        $(".widget-wrapper").remove();
        showDays();
        if (JSON.stringify(selectedElement) !== "{}") {
            openWidget(selectedElement);
        }
    }
};

switcher.on("click", switchTempUnit);

showDays = () => {
    days.forEach((el) => {
        let clickableBox = $("<div>").addClass("clickable");
        let dayTxt = $("<h3>").text(el.day);
        let dayTemp = $("<h5>").text(convertTemp(el.temp));
        let tempUnit = $("<p>").text(tempUnitType);
        clickableBox.append(dayTxt);
        clickableBox.append(dayTemp);
        clickableBox.append(tempUnit);
        daysWrapper.append(clickableBox);
        clickableBox.on("click", () => {
            $(".widget-wrapper").remove();
            openWidget(el);
            selectedElement = el;
        });
    });
};

pickClass = (element) => {
    if (element.windDirection === "west") {
        return "west";
    } else if (element.windDirection === "north") {
        return "north";
    } else if (element.windDirection === "south") {
        return "south";
    } else if (element.windDirection === "north-west") {
        return "north-west";
    } else if (element.windDirection === "north-east") {
        return "north-east";
    } else if (element.windDirection === "south-east") {
        return "south-east";
    } else if (element.windDirection === "south-west") {
        return "south-west";
    }
};

openWidget = element => {
    const widgetWrapper = $("<div>").addClass("widget-wrapper");
    const dayNameWrapper = $("<div>").addClass("day-name-wrapper wrapper");
    const dayNameTxt = $("<div>").addClass("day-name-text").text(element.day);

    const tempWrapper = $("<div>").addClass("temp-wrapper wrapper");
    const currentTemp = $("<h3>")
        .addClass("current-temp")
        .text(convertTemp(element.temp));
    const unitWrapper = $("<div>").addClass("unit-wrapper").text(tempUnitType);

    const windSpeedWrapper = $("<div>").addClass("wind-speed-wrapper wrapper");
    const windSpeed = $("<div>").addClass("wind-speed").text(calcWindSpeed(element.windSpeed));
    const windSpeedUnit = $("<h3>")
        .addClass("wind-speed-unit")
        .text(weatherData.windSpeedUnit);
    const switchBtn = $("<button>").text("Switch").on("click", () => {
        convertWindSpeedUnitType(element.windSpeed);
    });
    const windDirectionWrapper = $("<div>").addClass(
        "wind-direction-wrapper wrapper"
    );
    const windDirection = $("<div>")
        .addClass("wind-direction")
        .text(element.windDirection);
    const windDirectionArrow = $("<div>").addClass("wind-direction-arrow");
    const arrowImage = $("<img>")
        .attr("src", "img/arrow.png")
        .addClass(pickClass(element));

    const typeWrapper = $("<div>").addClass("type-wrapper wrapper");
    const typeText = $("<h3>").text(element.type);

    dayNameWrapper.append(dayNameTxt);
    tempWrapper.append(currentTemp);
    tempWrapper.append(unitWrapper);
    windSpeedWrapper.append(windSpeed);
    windSpeedWrapper.append(windSpeedUnit);
    windSpeedWrapper.append(switchBtn);
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
};

showDays();