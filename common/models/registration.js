module.exports = function(Registration) {
	Registration.register = function(gameId, userId, playGame, preferredTimeslot, duration, backToCompany, passengers, dinner, callback) {
		console.log('register player with userId ' + userId + ' for game with gameId ' + gameId);
		// find game by gameId
		var app = Registration.app;
		var Game = app.models.Game;
		Game.findById(gameId, function(err, game) {
			if (err) throw err;
			// console.log('found game');
			// console.log(err);
			// console.log(game);
			if (game) {
				var Player = app.models.Player;
				// find player by userId
				Player.findById(userId, function(err, player) {
					if (err) throw err;
					// console.log('found player');
					// console.log(player);
					game.registrations.findOne({
						where: {
							playerId: player.id
						}
					}, function(err, registration) {
						if (err) throw err;
						if (registration) {
							console.log('registration already exits; destroy old registration with id ' + registration.id);
							game.registrations.destroy(registration.id, function(err) {
								if (err) throw err;
								console.log('Registration removed');
							});
						}
						if (playGame) {
							var newRegistration = new Registration({
								'preferredTimeslot': preferredTimeslot,
								'duration': duration,
								'backToCompany': backToCompany,
								'passengers': passengers,
								'dinner': dinner,
								'playerId': player.id
							});
							if (backToCompany && passengers) {
								newRegistration[passengers] = passengers;
							}
							game.registrations.create(newRegistration, function(err, reg) {
								if (err) throw err;
								console.log('Registration added');
								console.log(reg);
							});
						}
					});
				});
			}
		});
		callback(null, 'OK');
	};
	Registration.remoteMethod(
		'register', {
			http: {
				path: '/register',
				verb: 'post'
			},
			accepts: [{
				arg: 'gameId',
				type: 'string'
			}, {
				arg: 'userId',
				type: 'string'
			}, {
				arg: 'playGame',
				type: 'boolean',
			}, {
				arg: 'preferredTimeslot',
				type: 'string',
			}, {
				arg: 'duration',
				type: 'string',
			}, {
				arg: 'backToCompany',
				type: 'boolean',
			}, {
				arg: 'passengers',
				type: 'number',
			}, {
				arg: 'dinner',
				type: 'boolean'
			}],
			descrption: 'TODO: describe me',
			returns: {
				arg: 'register',
				type: 'string'
			}
		}
	);
	Registration.getRegistrations = function(gameId, callback) {
		var app = Registration.app;
		var Game = app.models.Game;
		Game.findById(gameId, function(err, game) {
			if (err) throw err;
			game.registrations({
				include: 'player'
			}, function(err, registrations) {
				if (err) throw err;
				callback(null, registrations);
			});
		});
	};
	Registration.remoteMethod(
		'getRegistrations', {
			http: {
				path: '/getRegistrations',
				verb: 'post'
			},
			accepts: [{
				arg: 'gameId',
				type: 'string'
			}],
			descrption: 'TODO: describe me',
			// TODO optimze return values
			returns: {
				arg: 'registrations',
				type: 'Object'
			}
		}
	);
};
