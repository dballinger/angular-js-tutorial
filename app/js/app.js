'use strict';

angular.module('tutorial', [])

        .controller('ProductCtrl', function ($scope) {
            $scope.data = {
                products: [
                    {name: "Mug", price: 1.5},
                    {name: "Mini shopping cart", price: 2}
                ]
            };

            $scope.add = function () {
                $scope.data.products.push(
                        {
                            name: $scope.data.name,
                            price: $scope.data.price
                        }
                );
                delete $scope.data['name'];
                delete $scope.data['price'];
            };
        })

        .directive('productForm', function () {
            return {
                replace: true,
                restrict: 'E',
                template: '<form class="form-horizontal" ng-submit="add()">                                          ' +
                        '    <div class="form-group">                                                              ' +
                        '        <label for="product" class="col-lg-2 control-label">Product</label>               ' +
                        '                                                                                          ' +
                        '        <div class="col-lg-4">                                                            ' +
                        '            <input type="text" class="form-control" id="product" ng-model="data.name">    ' +
                        '        </div>                                                                            ' +
                        '    </div>                                                                                ' +
                        '    <div class="form-group">                                                              ' +
                        '        <label for="price" class="col-lg-2 control-label">Nett price</label>              ' +
                        '                                                                                          ' +
                        '        <div class="col-lg-2">                                                            ' +
                        '            <input type="text" class="form-control" id="price" ng-model="data.price">     ' +
                        '        </div>                                                                            ' +
                        '    </div>                                                                                ' +
                        '    <div class="form-group">                                                              ' +
                        '        <div class="col-sm-offset-2 col-sm-10">                                           ' +
                        '            <button type="submit" class="btn btn-primary">Add</button>                    ' +
                        '        </div>                                                                            ' +
                        '    </div>                                                                                ' +
                        '</form>                                                                                   '
            }
        })

        .factory('VatCalculator', function ($http, $q) {
            var promisedVat;
            return {
                calculateGross: function (nettPrice) {
                    if (!promisedVat) {
                        promisedVat = $http.get('data/vat.json').then(function (response) {
                            return nettPrice * (1 + (response.data.rate / 100.0));
                        });
                    }
                    return promisedVat;
                }
            }
        })
