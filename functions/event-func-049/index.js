const request = require('request-promise-native');
const config = require('./config');
const GROUP_NUMBER = 'OPP460-049';

module.exports = {
	handler: function (event, context) {
		const src = event.data != null ? JSON.parse(event.data.toString()) : null;

		const BID = src.EVENT_PAYLOAD.KEY[0].BUSINESSPARTNER;
		if (BID !== GROUP_NUMBER) {
			return;
		}

		return request.get({
			url: `https://my300405-api.s4hana.ondemand.com/sap/opu/odata/sap/API_BUSINESS_PARTNER/A_BusinessPartner('${BID}')`,
			headers: {
				'Accept': 'application/json',
				'Accept-Charset': 'utf-8',
				'Authorization': config.credentials
			},
			json: true
		})
		.then((res) => request({
			url: 'https://opp460-teched-monitor-api.cfapps.eu10.hana.ondemand.com/input',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				FunctionType: "event",
				GroupNumber: res.d.BusinessPartner,
				FirstName: res.d.FirstName,
				LastName: res.d.LastName,
				SearchTerm: res.d.SearchTerm1
			},
			json: true
		}))
		.catch((err) => {
			console.log(err);
		});
	}
};