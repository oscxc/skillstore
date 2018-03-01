
var $ = require('./Libs/to')
var Index = require('./Components/index')
var SkillView = require('./Components/SkillView/SkillView')

$.start(function () {
    Index.SkillView = new SkillView()
    Index.SkillView.show(document.body)
})
