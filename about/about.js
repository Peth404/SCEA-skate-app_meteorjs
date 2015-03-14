if (Meteor.isClient){
Template.about.events({
  'click a[target=_blank]': function (event) {
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }
});
}