module.exports = function(Registration) {
	Registration.getRegistrations = function(gameId, callback) {
		var app = Registration.app;
		var Game = app.models.Game;
		Game.findById(gameId, function(err, game) {
			game.registrations({
				include: 'player'
			}, function(err, registrations) {
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
