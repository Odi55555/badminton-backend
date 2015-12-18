var games = [{
  'date': '2015-12-14',
  'state': 'planned'
}, {
  'date': '2016-02-15',
  'state': 'planned'
}, {
  'date': '2015-12-13',
  'state': 'planned'
}, {
  'date': '2015-12-12',
  'state': 'planned'
}, {
  'date': '2015-12-11',
  'state': 'planned'
}];
 
module.exports = function(server) {
  var dataSource = server.dataSources.db;
  dataSource.automigrate('Game', function(er) {
    if (er) throw er;
    var Model = server.models.Game;
    //create sample data
    var count = games.length;
    games.forEach(function(game) {
      Model.create(game, function(er, result) {
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