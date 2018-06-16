AppManager.Views.Page1 = Backbone.View.extend({
  template: _.template($('#tpl-page1').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
