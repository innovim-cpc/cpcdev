(function ($) {

  Drupal.Leaflet.prototype._create_layer_orig = Drupal.Leaflet.prototype.create_layer;

  Drupal.Leaflet.prototype.create_collection = function(collection) {
    let self = this;
    let map_layers = new L.kmzLayer();
    for (let x = 0; x < collection.component.length; x++) {
      map_layers.addLayer(self.create_feature(collection.component[x]));
    }
    return map_layers;
  };

  Drupal.Leaflet.prototype.create_layer = function (layer, key) {
    //let map_layer = new L.TileLayer(layer.urlTemplate);
    let map_layer = L.kmzLayer();
    if (layer.type === 'kmz') {
      kmz.on('load', function(e) {
        control.addOverlay(e.layer, e.name);
        // e.layer.addTo(map);
      });

      // Add remote KMZ files as layers (NB if they are 3rd-party servers, they MUST have CORS enabled)
      kmz.load(layer);
      //kmz.load('https://raruto.github.io/leaflet-kmz/examples/regions.kmz');
      //kmz.load('https://raruto.github.io/leaflet-kmz/examples/capitals.kmz');
      //kmz.load('https://raruto.github.io/leaflet-kmz/examples/globe.kmz');

      //var control = L.control.layers(null, null, { collapsed:false }).addTo(map);
    }
    map_layer._leaflet_id = key;

    /*if (layer.type === 'kmz') {
      var mapLayer = new L.TileLayerQuad(layer.urlTemplate, layer.options);
      mapLayer._leaflet_id = key;
      return mapLayer;
    }*/

    /*if (layer.type === 'google' && layer.options.detectRetina && L.Browser.retina) {
      layer.urlTemplate += '&style=high_dpi&w=512';
      layer.options.tileSize = 512;
      var mapLayer = new L.TileLayer(layer.urlTemplate, layer.options);
      mapLayer._leaflet_id = key;
      return mapLayer;
    }*/
    // Default to the original code;
    //return Drupal.Leaflet.prototype._create_layer_orig(layer, key);
    return map_layer;
  };

})(jQuery);
