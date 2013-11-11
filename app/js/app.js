'use strict';

angular.module('tutorial', [])

        .controller('ProductCtrl', function ($scope) {
            $scope.data = {
                products: [
                    {name: "Mug", price: 1.5},
                    {name: "Mini shopping cart", price: 2}
                ]
            };

            $scope.add = function (form) {
                if (!form.$invalid) {
                    $scope.data.products.push(
                            {
                                name: $scope.data.name,
                                price: $scope.data.price
                            }
                    );
                    delete $scope.data['name'];
                    delete $scope.data['price'];
                }
            };
        })

        .directive('productForm', function () {
            return {
                replace: true,
                restrict: 'E',
                template: '<form name="productForm" class="form-horizontal" ng-submit="add(productForm)" novalidate>                                   ' +
                        '    <div class="form-group">                                                                                                  ' +
                        '        <label for="product" class="col-lg-2 control-label">Product</label>                                                   ' +
                        '                                                                                                                              ' +
                        '        <div class="col-lg-4">                                                                                                ' +
                        '            <input type="text" class="form-control" id="product" ng-model="data.name">                                        ' +
                        '        </div>                                                                                                                ' +
                        '    </div>                                                                                                                    ' +
                        '    <div class="form-group">                                                                                                  ' +
                        '        <label for="price" class="col-lg-2 control-label">Nett price</label>                                                  ' +
                        '                                                                                                                              ' +
                        '        <div class="col-lg-2">                                                                                                ' +
                        '            <input type="text" class="form-control" name="price" id="price" ng-model="data.price" smart-float>                ' +
                        '            <div class="alert-danger" ng-show="productForm.price.$error.float">Err... enter a float</div>                     ' +
                        '        </div>                                                                                                                ' +
                        '    </div>                                                                                                                    ' +
                        '    <div class="form-group">                                                                                                  ' +
                        '        <div class="col-sm-offset-2 col-sm-10">                                                                               ' +
                        '            <button type="submit" class="btn btn-primary">Add</button>                                                        ' +
                        '        </div>                                                                                                                ' +
                        '    </div>                                                                                                                    ' +
                        '</form>                                                                                                                       '
            }
        })

        .directive('withVat', function (VatCalculator, currencyFilter) {
            return {
                restrict: 'A',
                scope: {
                    nettPrice: '=withVat'
                },
                link: function (scope, element, attrs) {
                    scope.$watch('nettPrice', function (nettPrice) {
                        VatCalculator.calculateGross(nettPrice).then(function (grossPrice) {
                            element.text(currencyFilter(grossPrice))
                        });
                    });
                }
            }
        })

        .factory('VatCalculator', function ($http, $q) {
            var promisedVat;
            return {
                calculateGross: function (nettPrice) {
                    if (!promisedVat) {
                        promisedVat = $http.get('data/vat.json').then(function (response) {
                            return (1 + (response.data.rate / 100.0));
                        });
                    }
                    return promisedVat.then(function (factor) {
                        return nettPrice * factor;
                    });
                }
            }
        })

        .directive('smartFloat', function () {
            var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            ctrl.$setValidity('float', true);
                            return parseFloat(viewValue.replace(',', '.'));
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                }
            };
        })