AppManager.Router = Backbone.Router.extend({
  routes: {
    '': 'showGetSkills',
    'get-skills': 'showGetSkills',
    'get-skills-return': 'showGetSkillsReturn',
    'technical-list-return': 'showTechnicalListReturn',
    'people-list-return': 'showPeopleListReturn'
  }
});
