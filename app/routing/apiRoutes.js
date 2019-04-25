
var friendsArray = require('../data/friends');
//console.log(friendsArray);

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendsArray);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friendsArray
    var newFriendScore = req.body.scores;
    var scoresArray = [];
    
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i = 0; i < friendsArray.length; i++){
      var totalDifference = 0;
      //runs through scores to compare friends
      for(var j = 0; j < newFriendScore.length; j++){
        totalDifference += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newFriendScore[j])));
      }

      //push results into scoresArray
      scoresArray.push(totalDifference);
    }

    //after all friends are compared, find best match
    for(var i = 0; i < scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bestFriend = friendsArray[bestMatch];
    res.json(bestFriend);

    //pushes new submission into the friendsArray 
    friendsArray.push(req.body);
  });
};