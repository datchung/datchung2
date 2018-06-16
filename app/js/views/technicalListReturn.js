AppManager.Views.TechnicalListReturn = Backbone.View.extend({
  template: _.template($('#tpl-technical-list-return').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
