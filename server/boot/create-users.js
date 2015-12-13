var users = [
    {username: 'Armin', email: 'dev@odenkirchen.info', password: 'foobar'},
    {username: 'Thomas', email: 'dev@odenkirchen.info', password: 'foobar'},
    {username: 'Andreas', email: 'dev@odenkirchen.info', password: 'foobar'}
];
 
module.exports = function(server) {
  var dataSource = server.dataSources.db;
  dataSource.automigrate('User', function(er) {
    if (er) throw er;
    var userModel = server.models.User;
    var playerModel = server.models.Player;
    //create sample data
    var count = users.length;
    users.forEach(function(user) {
      userModel.create(user, function(er, result) {
        if (er) return;
        console.log('Record created:', result);
		playerModel.create({userId: result.id}, function(er, result) {
			if (er) return;
			console.log('Player created:', result);
		});
        count--;
        if (count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      });

    });
  });
};