AppManager.Views.PeopleListReturn = Backbone.View.extend({
  template: _.template($('#tpl-people-list-return').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
