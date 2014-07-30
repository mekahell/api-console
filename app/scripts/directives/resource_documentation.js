(function() {
  'use strict';

  RAML.Directives.resourceDocumentation = function($rootScope, $window) {
    var popover;
    angular.element($window).bind('resize', function() {
      if (popover) {
        popover.resize();
      }
    });

    function Controller($scope) {
      var receipt;

      $rootScope.$on('console:resource:destroyed', function(event, resource) {
        if ($scope.resource && $scope.resource.toString() === resource.toString()) {
          receipt = setTimeout(function() {
            popover.close($scope);
            popover = undefined;
          }, 100);
        }
      });

      $rootScope.$on('console:resource:close', function close(event, $resourceEl) {
        var $li = $resourceEl[0];
        var $resourcePanel = angular.element($li.querySelector('.resource-panel'));

        angular.element($li.querySelectorAll('.tab')).removeClass('is-active');
        angular.element($li).removeClass('is-active');
        angular.element($li.querySelectorAll('.resource')).removeClass('is-active');
        $resourcePanel.removeAttr('style');
      });

      $rootScope.$on('console:expand', function(event, resource, method, $resourceEl, $current) {
        console.log('on:console:expand');

        // Ensures only one resource documentation at a time
        var root = angular.element(document.querySelector('.resource-list-root'))[0];
        angular.element(root.querySelectorAll('.resource-panel')).removeAttr('style');
        angular.element(root.querySelectorAll('.tab')).removeClass('is-active');
        angular.element(root.querySelectorAll('.resource')).removeClass('is-active');

        var $li = $current.parent().parent().parent()[0];
        var $resourcePanel = angular.element($li.querySelector('.resource-panel'));

        $resourcePanel.css('overflow', 'visible');
        $resourcePanel.css('display', 'block');
        $resourcePanel.css('height', 'auto');
        $resourcePanel.css('margin-top', '0px');
        $resourcePanel.css('margin-bottom', '0px');
        $resourcePanel.css('padding-top', '0px');
        $resourcePanel.css('padding-bottom', '0px');

        angular.element($resourceEl[0].querySelectorAll('.tab')).removeClass('is-active');
        $current.addClass('is-active');
        angular.element($li).addClass('is-active');
        angular.element($li.querySelector('.resource')).addClass('is-active');
        $scope.method = method;
        $scope.resource = resource;
      });

      $scope.isEmpty = function(params) {
        return RAML.Utils.isEmpty(params);
      };

      $scope.showResponse = function ($event) {
        angular.element(angular.element($event.currentTarget).parent()[0].querySelectorAll('a')).removeClass('is-active');
        angular.element($event.currentTarget).addClass('is-active');
        // Remove querySelectorAll
        angular.element(document.querySelectorAll('.resource-response')).addClass('is-active');
        angular.element(document.querySelectorAll('.resource-request')).removeClass('is-active');
      };

      $scope.showRequest = function ($event) {
        angular.element(angular.element($event.currentTarget).parent()[0].querySelectorAll('a')).removeClass('is-active');
        angular.element($event.currentTarget).addClass('is-active');
        // Remove querySelectorAll
        angular.element(document.querySelectorAll('.resource-request')).addClass('is-active');
        angular.element(document.querySelectorAll('.resource-response')).removeClass('is-active');
      };

      $scope.showSchema = function (responseCode) {
        $scope['resourceStatus' + responseCode] = !$scope['resourceStatus' + responseCode];
      };

      $scope.toggleFullScreen = function () {
        var $sidebar = angular.element(document.querySelectorAll('.sidebar'));

        if (document.querySelectorAll('.sidebar.is-fullscreen').length > 0) {
          $sidebar.removeClass('is-fullscreen');
        } else {
          $sidebar.addClass('is-fullscreen');
        }
      };

      $scope.collapseTryIt = function () {
        if (document.querySelectorAll('.sidebar.is-collapsed').length > 0) {
          angular.element(document.querySelectorAll('.resource-panel')).removeClass('has-sidebar-fullscreen has-sidebar-collapsed');
          angular.element(document.querySelectorAll('.sidebar')).removeClass('is-collapsed');
        } else {
          angular.element(document.querySelectorAll('.resource-panel')).addClass('has-sidebar-fullscreen has-sidebar-collapsed');
          angular.element(document.querySelectorAll('.sidebar')).addClass('is-collapsed');
        }
      };

      $scope.displayHeaders = function() {
        if ($scope.method) {
          var parameters = $scope.method.headers || {};
          parameters.plain = parameters.plain || {};
          parameters.parameterized = parameters.parameterized || {};

          return Object.keys(parameters.plain).length > 0 || Object.keys(parameters.parameterized).length > 0;
        }
      };

      $scope.displayQueryParameters = function() {
        if ($scope.method) {
          var parameters = $scope.method.queryParameters || {};

          return Object.keys(parameters).length > 0;
        }
      };

      $scope.displayUriParameters = function() {
        if ($scope.resource) {
          var parameters = $scope.resource.uriParametersForDocumentation || {};

          return Object.keys(parameters).length > 0;
        }
      };
    }

    return {
      restrict: 'E',
      templateUrl: 'views/resource_documentation.tmpl.html',
      controller: Controller,
      scope: {
        api: '=',
        ramlConsole: '=',
        ngShow: '='
      }
    };
  };
})();
