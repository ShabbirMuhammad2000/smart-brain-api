const Clarifai = require('clarifai')

const handleLeaderboardGet = (req, res, db) => {
  db.select('*')
    .from('users')
    .orderBy('entries', 'desc')
    .limit(10)
    .then(data => {
      console.log(data); // add this line
      res.json(data);
    })
    .catch(error => {
      console.log(error); // add this line
      res.status(400).json('unable to get leaderboard');
    });
};


module.exports = {
  handleLeaderboardGet: handleLeaderboardGet
};

