export default class yaMapsService {
    getAddress(coordinates) {
        return ymaps.geocode(coordinates, {
          results: 1,
        })
        .then((res) => res.geoObjects.get(0).properties.get('text'));
    }
}