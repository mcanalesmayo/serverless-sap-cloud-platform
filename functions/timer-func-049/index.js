const request = require('request-promise-native');
const GROUP_NUMBER = 'OPP460-460';

module.exports = {
	handler: function (event, context) {

		return request.get({
			url: 'https://opp460-teched-monitor-api.cfapps.eu10.hana.ondemand.com/statistics',
			json: true
		})
		.then((res) => request({
			url: 'https://opp460-teched-monitor-api.cfapps.eu10.hana.ondemand.com/input',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				FunctionType: "timer",				
				GroupNumber: GROUP_NUMBER
			},
			json: true
		}))
		.catch((err) => {
			console.log(err);
		});
	}
};