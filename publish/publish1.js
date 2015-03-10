
if(Meteor.isClient){
	Template.clientsView.helpers({
	'competition': function(){
			return logTable.find({}, {sort: {points: -1, name: 1}});
		},
	'table': function(){
		return SportsTable.find({});
	}
	});
}