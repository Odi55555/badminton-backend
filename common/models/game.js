module.exports = function(Game) {
	Game.register = function(gameId, userId, playGame, preferredTimeslot, duration, backToCompany, passengers, dinner, callback) {
		console.log('register player with userId ' + userId + ' for game with gameId ' + gameId);
		// find game by gameId
		Game.findById(gameId, function(err, game) {
			if (err) throw err;
			// console.log('found game');
			// console.log(err);
			// console.log(game);
			if (game) {
				var app = Game.app;
				var Player = app.models.Player;
				// find player by userId
				Player.findById(userId, function(err, player) {
					if (err) throw err;
					// console.log('found player');
					// console.log(player);
					game.registrations({
						where: {
							playerId: player.id
						}
					}, function(err, registrations) {
						if (err) throw err;
						if (registrations.length > 0) {
							console.log('registration already exits; destroy old registration with id' + registrations[0].id);
							game.registrations.destroy(registrations[0].id, function(err) {
								if (err) throw err;
								console.log('Registration removed');
							});
						}
						if (playGame) {
							var Registration = app.models.Registration;
							var registration = new Registration({
								'preferredTimeslot': preferredTimeslot,
								'duration': duration,
								'backToCompany': backToCompany,
								'passengers': passengers,
								'dinner': dinner,
								'playerId': player.id
							});
							if (backToCompany && passengers) {
								registration[passengers] = passengers;
							}
							game.registrations.create(registration, function(err, reg) {
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
	Game.remoteMethod(
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
};