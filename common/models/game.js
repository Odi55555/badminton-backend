module.exports = function(Game) {
	Game.validatesUniquenessOf('date', {message: 'date is not unique'});
};