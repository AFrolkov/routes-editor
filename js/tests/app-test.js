describe('myApp', () => {
	beforeEach(module('myApp'));

	describe('controller', () => {
		var controller, yaMapsService, $scope;
		beforeEach(inject((_yaMapsService_, $rootScope, $controller, $q) => {
			var deffered = $q.defer();
			$scope = $rootScope.$new();
			yaMapsService = _yaMapsService_;
			controller = $controller('LocationController', {yaMapsService, $scope});
			controller.map = {getCenter() { return [0,0]; }};

			spyOn(yaMapsService, 'getAddress').and.returnValue(deffered.promise);
		}));

		it('should clear input when addPoint', () => {
			controller.addPoint('Point 1');
			expect(controller.pointName).toBe('');
		});

		it('should add point in array when addPoint', () => {
			controller.addPoint('Point 1');
			controller.addPoint('Point 2');
			controller.addPoint('Point 3');
			expect(controller.geoPoints.length).toBe(3);
		});

		it('should call yaMapsService when addPoint', () => {
			controller.addPoint('Point 1');
			expect(yaMapsService.getAddress).toHaveBeenCalled();
		});

		it('should remove point from array when removePoint', () => {
			controller.addPoint('Point 1');
			controller.addPoint('Point 2');
			controller.removePoint(0);
			expect(controller.geoPoints.length).toBe(1);
		});
	});
});