'use strict';

describe('tutorial components', function () {

    beforeEach(module('tutorial'));

    describe('ProductCtrl', function () {

        var scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            $controller('ProductCtrl', {$scope: scope});
        }));

        it('should contain an array of existing products.', function () {
            expect(scope.data.products).toEqual(
                    [
                        {name: "Mug", price: 1.5},
                        {name: "Mini shopping cart", price: 2}
                    ]
            );
        });

        it('should add new product.', function () {
            scope.data.name = "new";
            scope.data.price = 10;
            scope.add();
            expect(scope.data.products[scope.data.products.length - 1]).toEqual(
                    {name: "new", price: 10}
            );
        });

        it('should add new product.', function () {
            scope.data.name = "new";
            scope.data.price = 10;
            scope.add();
            expect(scope.data.name).toBeUndefined();
            expect(scope.data.price).toBeUndefined();
        });
    });

    describe('productForm', function () {
        var form;

        beforeEach(inject(function ($compile, $rootScope) {
            form = $compile('<product-form></product-form>')($rootScope.$new())
        }));

        it('should have two inputs', function () {
            expect(form.find('input').length).toEqual(2);
        })
    });

    describe('VatCalculator', function () {

        var httpBackend;

        beforeEach(inject(function ($httpBackend) {
            httpBackend = $httpBackend;
            httpBackend.expect('GET', 'data/vat.json').respond({"rate": 20});
        }));

        it('should calculate vat', inject(function (VatCalculator) {
            var nettPrice = 10;
            var expectedGrossPrice = 12;

            var promisedGross = VatCalculator.calculateGross(nettPrice);

            var actualGrossPrice;
            promisedGross.then(function (resolved) {
                actualGrossPrice = resolved;
            });
            httpBackend.flush();

            expect(actualGrossPrice).toEqual(expectedGrossPrice);
        }));

        it('should cache the vat rate', inject(function (VatCalculator) {
            var nettPrice = 10;
            var expectedGrossPrice = 12;

            VatCalculator.calculateGross(nettPrice);
            VatCalculator.calculateGross(nettPrice);
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingRequest();
            httpBackend.verifyNoOutstandingExpectation();
        })
    });
});