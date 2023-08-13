const formatMessage = (message) => {
	const date = new Date();
	return {
		message: message,
		userName: 'yousef salah',
		time: date.getHours()+":"+date.getMinutes(),
		userImage: '/images/favicon.png'
	}
}

module.exports = formatMessage;