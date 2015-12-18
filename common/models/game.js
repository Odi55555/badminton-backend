module.exports = function(Game) {
	Game.validatesUniquenessOf('date', {message: 'date is not unique'});
	Game.gamesWithRegistrations = function(callback) {
		Game.find({include: {registrations: 'player'}}, function(err, games) {
			if (err) throw err;
			callback(null, games);
		});
	};
	Game.remoteMethod(
		'gamesWithRegistrations', {
			http: {
				path: '/gamesWithRegistrations',
				verb: 'get'
			},
			descrption: 'TODO: describe me',
			// TODO optimze return values
			returns: {
				arg: 'games',
				type: 'Object'
			}
		}
	);
};