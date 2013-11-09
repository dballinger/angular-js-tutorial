'use strict';

describe('tutorial components', function () {

    beforeEach(module('tutorial'));

    describe('ProductCtrl', function () {

        var scope;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            $controller('ProductCtrl', {$scope: scope});
        }));

        it('should contain an array of existing products.', function() {
            expect(scope.data.products).toEqual(
                    [
                        {name:"Mug", price:1.5},
                        {name:"Mini shopping cart", price:2}
                    ]
            );
        });
    });
});
