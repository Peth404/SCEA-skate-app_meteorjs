SportsTable = new Mongo.Collection('table');
logTable = new Mongo.Collection('competition');

if(Meteor.isClient){
	Template.createsportTable.helpers({
		'table': function(){
			return SportsTable.find({});
		},
		'competition': function(){
			return logTable.find({}, {sort: {points: -1, name: 1}});
			
		},
		'selectedClass': function() {
  		var compId = this._id;
  		var selectedTeam = Session.get('selectedTeam');
  			if(compId == selectedTeam) {
  				return "selected"
  				//console.log(selectedTeam)
  			}
  		}
	});

	Template.createsportTable.events({
		'submit .tableDetails': function(){ 
			var formTitle = event.target.tableTitle.value;
			var formDate = event.target.tableDate.value;
				SportsTable.insert({
					title: formTitle,
					date: formDate,
			});
			event.target.tableTitle.value = "";
			event.target.tableDate.value= "";	
		},
		'submit .compDetails': function(){
			//var compNumberVar = event.target.compNumber.value;
			var compNameVar = event.target.compName.value;
			
				logTable.insert({
					//number: compNumberVar,
					name: compNameVar,
					points: 0,
				});
				//event.target.compNumber.value = "";
				event.target.compName.value = "";
				
		},
		'click .compClass': function() {
  		var compId = this._id;
  		Session.set('selectedTeam', compId);
  		Session.get('selectedTeam');
  			var selectedTeam = Session.get('selectedTeam');
  			//console.log(selectedTeam);
  		},
  		'click .increment': function() {
		var selectedTeam = Session.get('selectedTeam');
		//var pointsVar = event.target.compPoints.value;
		logTable.update(selectedTeam, {$inc: {points: 5}});
			console.log(selectedTeam)
		}, 

		'click .remove': function() {
		var selectedTeam = Session.get('selectedTeam');
		logTable.remove(selectedTeam);
			console.log("removed")
		}

	});
	//console.log("submit");
	//console.log(formTitle);
}
if (Meteor.isServer){
		Meteor.publish('the-skaters', function(){
			return logTable.find();
		});
		Meteor.publish('the-db', function(){
			return SportsTable.find();
		});
}