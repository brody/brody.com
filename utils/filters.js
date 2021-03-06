const { DateTime } = require("luxon");

module.exports = {
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	htmlDateString: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat("yyyy-LL-dd");
	},
	prettyDate: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat("MMMM dd, yyyy");
	},
	dayDate: (dateObj) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat("dd");
	},
	formatDate: (dateObj, format) => {
		return DateTime.fromJSDate(dateObj, {
			zone: "utc",
		}).toFormat(format);
	},
};
