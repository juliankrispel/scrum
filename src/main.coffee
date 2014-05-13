angular.module('scrum', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider)->
    $stateProvider
        .state('index', {
            url: '/'
            template: '<h1>hello</h1>'

        })
        .state('project', {
            url: '/project'
            templateUrl: 'new-project.html'
        })
    $urlRouterProvider.otherwise('/project')
])
