(function() {
  'use strict';

  RAML.Directives.ramlConsole = function(ramlParserWrapper) {

    var link = function ($scope, $el, $attrs, controller) {
      ramlParserWrapper.onParseSuccess(function(raml) {
        var inspected = RAML.Inspector.create(raml);

        $scope.api = controller.api = inspected;
      });

      ramlParserWrapper.onParseError(function(error) {
        $scope.parseError = error;
      });
    };

    return {
      restrict: 'E',
      templateUrl: 'views/raml-console.tmpl.html',
      controller: RAML.Controllers.RAMLConsole,
      scope: {
        src: '@'
      },
      link: link
    };
  };
})();
