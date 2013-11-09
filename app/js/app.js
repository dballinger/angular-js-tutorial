'use strict';

angular.module('tutorial', [])

        .controller('ProductCtrl', function ($scope) {
            $scope.data = {
                products: [
                    {name: "Mug", price: 1.5},
                    {name: "Mini shopping cart", price: 2}
                ]
            };
        })
