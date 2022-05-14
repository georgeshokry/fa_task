angular.module('appModule')
  .config(($locationProvider) => {
    $locationProvider.html5Mode({
      enabled: true,
    });
  })
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
      .state({
        name: 'app',
        url: '/',
        templateUrl: './pages/home-page/home-page.html',
        controller: 'homeController',
        controllerAs: 'homePageVm',
      })
      .state({
        name: 'team-performance',
        url: '/team-performance',
        template: '<v-performance-page></v-performance-page>',
      })
      .state({
        name: '404',
        url: '/404',
        template: '<v-not-found></v-not-found>',
      });
    $urlRouterProvider.otherwise(function ($injector, $location) {
      let state = $injector.get('$state');
      state.go('404');
      return $location.path();
    });
  });
