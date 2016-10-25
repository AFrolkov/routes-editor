export default class LocationController {
    constructor(yaMapsService, $scope) {
        this.$scope = $scope;
        this.yaMapsService = yaMapsService;

        this.id = 0;
        this.geoPoints = [];
        this.lines = {
            geometry: {
                type: 'LineString',
                coordinates: [],
            },
            options: {
                strokeColor: '#00000088',
                strokeWidth: 4
            }
        };

        this.sortableConf = {
            forceFallback: true, 
            animation: 100,
            onUpdate: () => {
                this.updateLineString();
            }
        }; 
    }

    afterMapInit(map) {
        this.map = map;
    }

    dragEnd(ev) {
        let dragPoint = ev.get('target');

        this.geoPoints.forEach((geoPoint) => {
            if (dragPoint.properties.getAll().id !== geoPoint.properties.id) return;
          
            geoPoint.geometry.coordinates = dragPoint.geometry.getCoordinates();

            this.updateAddress(geoPoint);
        });

        this.updateLineString();
    }

    addPoint(pointName) {
        let geoPoint = {};

        geoPoint.geometry = {
            type: 'Point',
            coordinates: this.map.getCenter()
        };

        geoPoint.properties = {
            balloonContent: pointName,
            id: this.id++
        };

        geoPoint.options = {
            draggable: true
        };

        geoPoint.name = pointName;

        this.geoPoints.push(geoPoint);
        this.pointName = '';
        this.updateLineString();
        this.updateAddress(geoPoint);
    }

    updateAddress(geoPoint) {
    this.yaMapsService.getAddress(geoPoint.geometry.coordinates)
        .then((res) => {
            geoPoint.properties.hintContent = res;
            this.$scope.$digest();
        });
    }

    updateLineString() {
        this.lines.geometry.coordinates = this._collectPointsCoordinates();
    }
  
    _collectPointsCoordinates() {
        let arrCoordinatesCollection = [];

        this.geoPoints.forEach((geoPoint) => {
            arrCoordinatesCollection.push(geoPoint.geometry.coordinates);
        });

        return arrCoordinatesCollection;
    }
  
    removePoint(index) {
        this.geoPoints.splice(index, 1);
        this.updateLineString();
    }
}

LocationController.$inject = ['yaMapsService', '$scope'];