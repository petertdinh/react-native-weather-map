const key = '5dddd71608c7230511738b6263642e13';
const rootUrl = `http://api.openweathermap.org/data/2.5/weather?APPID=${key}`;

function kelvinToF(kelvin) {
	return Math.round((kelvin - 273.15) * 1.8 + 32) + '˚F';
}

export default fetchWeather = (lat, lon) => {
	const url = `${rootUrl}&lat=${lat}&lon=${lon}`;

	return fetch(url)
		.then(response => response.json())
		.then((json) => {
			const { name, main, weather } = json;
			return {
				city: name,
				description: weather[0].description,
				temperature: kelvinToF(main.temp),
			};
		})
		.catch((err) => {
			console.warn(err);
		})
}