
var friendsArray = require('../data/friends');

module.exports = function(app){
  //a GET route that displays JSON of all possible friends
  app.get('/api/friends', function(req,res){
    res.json(friendsArray);
  });

  app.post('/api/friends', function(req,res){
    //grabs the new friend's scores to compare with friends in friendArray
    var newFriendScore = req.body.scores;
    var scoresArray = [];
    
    var bestGuess = 0;

    //runs through all current friends in list
    for(var i = 0; i < friendsArray.length; i++){
      var scoreDifference = 0;
      //run through scores to compare friends
      for(var j = 0; j < newFriendScore.length; j++){
        scoreDifference += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newFriendScore[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoreDifference);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestGuess]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bestFriend = friendsArray[bestGuess];
    res.json(bestFriend);

    //pushes new submission into the friendsList array
    friendsArray.push(req.body);
  });
};