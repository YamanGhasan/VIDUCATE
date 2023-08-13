const http = require('http');
const formatMessage = require('../helpers/messageFormatter');
const userId = '644ab3e02e75d552458a5eb1'
const User = require('../models/User');

/**
 * running server with live chat functionality 
 * 
 * @param {Express} app 
 */

module.exports = (app) => {
	const server = http.createServer(app);
	const { Server } = require("socket.io");
	const io = require('socket.io')(server, {
		cors: {
			origin: "http://localhost:4000",
			methods: ["GET", "POST"]
		}
	});

	io.use((socket, next) => {
		const req = socket.request;
		User.findById(userId)
			.then(user => {
				req.user = user;
				next();
			})
			.catch(err => {
				console.error(err);
				next(new Error('Unauthorized'));
			});
	});

	io.on('connection', (socket) => {
		socket.broadcast.emit('message', formatMessage('user Join'));
	
		socket.allowedToSendMessage = true;
	
		socket.on('message', (message) => {
			if (!socket.allowedToSendMessage) {
				socket.emit('errorMessage', 'Please wait 10 seconds before sending another message');
				return;
			}
	
			// Send the message
			const formattedMessage = formatMessage(message);
			formattedMessage.userName = socket.request.user.userName;
			formattedMessage.userImage = socket.request.user.image;
			io.emit('message', formattedMessage);
	
			// Add a timeout of 10 seconds (10000 milliseconds) before allowing another message
			socket.allowedToSendMessage = false;
			setTimeout(() => {
				socket.allowedToSendMessage = true;
			}, 10000);
		});
	
		socket.on('disconnect', () => {
			io.emit('message', formatMessage('user disconnected'));
		});
		socket.on('errorMessage', (errorMessage) => {
			// Display the error message to the user
			alert(errorMessage);
		});
	});
	
	server.listen(4000, () => {
		console.log(`Listening on port ${process.env.SERVER_PORT}`);
		console.log(`http://localhost:${process.env.SERVER_PORT}`);
	});
}
