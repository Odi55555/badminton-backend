var players = [
    {username: 'Armin', email: 'dev@odenkirchen.info', password: 'foobar', gamesLost: 0, gamesWon: 0},
    {username: 'Thomas', email: 'dev@odenkirchen.info', password: 'foobar', gamesLost: 0, gamesWon: 0},
    {username: 'Andreas', email: 'dev@odenkirchen.info', password: 'foobar', gamesLost: 0, gamesWon: 0}
];
 
module.exports = function(server) {
  var dataSource = server.dataSources.db;
  dataSource.automigrate('Player', function(er) {
    if (er) throw er;
    var playerModel = server.models.Player;
    var count = players.length;
    players.forEach(function(player) {
      playerModel.create(player, function(er, result) {
        if (er) return;
        console.log('Record created:', result);
        count--;
        if (count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      });

    });
  });
};