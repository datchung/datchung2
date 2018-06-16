AppManager.Views.GetSkills = Backbone.View.extend({
  template: _.template($('#tpl-get-skills').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
