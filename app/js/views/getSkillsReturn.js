AppManager.Views.GetSkillsReturn = Backbone.View.extend({
  template: _.template($('#tpl-get-skills-return').html()),

  render: function() {
    var html = this.template();
    this.$el.html(html);
    return this;
  }
});
