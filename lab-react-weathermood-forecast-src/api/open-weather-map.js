import axios from 'axios';

// TODO replace the key with yours
const key = 'd69c3edd42da8fb2b4580e675a2c7cef';

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

let forecastSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: getWeatherGroup(res.data.weather[0].id),//res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

export function getForecast(city, unit) {  // 5 days
    const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}`;
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: forecastSource.token})
                .then(res => {
                    if (res.data.cod != 200){
                        throw new Error(res.data.message);
                    } else {
                        let resultList = [];
                        //console.log("orig:",resultList);
                        let currentDate = new Date();
                        for (let data of res.data.list){
                            
                            let dataDate = new Date(data.dt * 1000);
                            let dataDateHour = dataDate.getHours();

                            if(dataDate.getDay() === currentDate.getDay() || (dataDateHour != 5 && dataDateHour != 20)){
                                continue;
                            }



                            let obj = {}
                            obj.dates = dataDate;
                            obj.codes = data.weather[0].id;
                            //console.log("date:",dataDate,"weather ",obj.codes);
                            obj.group = getWeatherGroup(data.weather[0].id);
                            obj.descriptions = "Tomorrow: " + data.weather[0].description;
                            obj.temp  = data.main.temp;
                            obj.unit  = unit;
                            resultList.push(obj);
                            //console.log("push:",obj);
                            //console.log("result ",resultList);
                        }
                        console.log("result ",resultList);
                        return resultList;
                    }
                })
                .catch(function(err) {
                    if (axios.isCancel(err)) {
                        console.error(err.message, err);
                    } else {
                        throw err;
                    }
                });
}

export function cancelForecast() {
    forecastSource.cancel('Request canceled');
}

/*

export function getWeather(city, unit) {
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

export function getForecast(city, unit) {
    // TODO
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making Forecast request to: ${url}`);

    const weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.list === 'undefined') {
            throw new Error(res.data.message);
        } else {
            console.log("res.data =",res.data)
            let offset = 0;
            const listOfWeek = res.data.list.filter((value, index) => {
                if (offset === index) {
                    offset = offset + 8;
                    const date = new Date(value.dt * 1000);
                    value['weekday'] = weekday[date.getDay()];
                    return value;
                }
            });
            return {
                city: capitalize(res.data.city.name),
                listOfWeek: listOfWeek,
                code: listOfWeek[0].weather[0].id,
                group: getWeatherGroup(listOfWeek[0].weather[0].id),
                description: listOfWeek[0].weather[0].description,
                temp: listOfWeek[0].main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelForecast() {
    // TODO
    weatherSource.cancel('Weather request canceled');
}
*/