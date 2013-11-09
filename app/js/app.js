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
