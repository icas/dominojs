/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
    console.log("+ DASHBOARD.INDEX");
    User.find().exec(function (err, users){
      return res.view({
        user: req.user,
        players: users
      });
    });
  }
};

