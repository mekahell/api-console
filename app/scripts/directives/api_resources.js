(function() {
  'use strict';

  RAML.Directives.apiResources = function() {
    var controller = function($scope, $element) {
      var self = $scope.apiResources = this;
      this.collapsed = {};

      this.toggleAll = function(collapsed) {
        $scope.api.resourceGroups.forEach(function(group) {
          var key = self.keyFor(group);
          self.collapsed[key] = collapsed;
        });
      };

      this.isCollapsed = function(group) {
        var key = self.keyFor(group);
        return self.collapsed[key];
      };

      this.openDocumentation = function($event, method, resource) {
        $event.stopPropagation();

        // this.expanded || this.toggleExpansion();
        console.log('emit:console:expand');
        $scope.$emit('console:expand', resource, method, $element, angular.element($event.currentTarget));
      };

      this.closePopover = function($event) {
        $event.stopPropagation();
        $scope.$emit('console:resource:close', $element);
      };
    };

    controller.prototype.keyFor = function(group) {
      return group[0].pathSegments[0].toString();
    };

    return {
      restrict: 'E',
      templateUrl: 'views/api_resources.tmpl.html',
      replace: true,
      controller: controller
    };
  };
})();
