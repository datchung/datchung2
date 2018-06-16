AppManager.Views.Page2 = Backbone.View.extend({
  template: _.template($('#tpl-page2').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
