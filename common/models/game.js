module.exports = function(Game) {
	Game.register = function(gameId, userId, playGame, callback) {
		console.log('register player with userId ' + userId + ' for game with gameId ' + gameId);
		Game.findById(gameId, function(err, game) {
			// console.log('found game');
			// console.log(err);
			// console.log(game);
			if (game) {
				var app = Game.app;
				var Player = app.models.Player;
				Player.find({where: {userId: userId}}, function(err, players) {
					// console.log('found player');
					// console.log(players);
					if (playGame) {
						game.players.add(players[0], function(err) {
						  console.log('Player added');
						});		
					} else {
						game.players.remove(players[0], function(err) {
						  console.log('Player removed');
						});
					}							
				});
			}
		});
		var response;
		response = 'Done.';
		callback(null, response);
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