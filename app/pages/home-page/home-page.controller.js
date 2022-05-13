angular
  .module('appModule')
  .controller('homeController', homePageController, ['$location'])
  .filter('highlight', function ($sce) {
    return function (str, termsToHighlight) {
      //  create a regex for the hightlight part
      let regex = new RegExp(termsToHighlight, 'gi');
      //  match search string and replace the main string with the highlighted part
      return $sce.trustAsHtml(str.replace(regex, '<span class="c-user-lit__highlight">$&</span>'));
    };
  });

function homePageController(Employees, $location) {
  const homePageVm = this;
  initValues();
  activate();

  function activate() {
    Employees.getEmployees()
      .then(({ data }) => {
        homePageVm.employees = homePageVm.employees.concat(data.employees);
      });
  }
  function initValues() {
    homePageVm.employees = [];
    homePageVm.searchValue = $location.search().filter;
  }
  this.handleTyping = function (typedValue) {
    $location.search('filter', typedValue);
    homePageVm.searchValue = typedValue;
  };
  this.resetSearchInput = function () {
    $location.search('filter', '');
    homePageVm.searchValue = '';
  };
}
