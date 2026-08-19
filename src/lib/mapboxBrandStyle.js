// Sappie-kleurenpalet toegepast op de Mapbox "light"-basisstijl, zodat elke
// kaart op de site aansluit bij de huisstijl i.p.v. een los standaardblok.
// Gedeeld tussen de verkooppunten-kaart en de wereldkaart.
export const BRAND_MAP_COLORS = {
  background: '#FAF4E6',
  water: '#AFCBDD',
  landuse: '#E8DEBE',
  building: '#EDE3C8',
  road: '#3A3E2C',
  text: '#3A3E2C',
  textHalo: '#FAF4E6',
};

// Lagen die we helemaal verbergen om de kaart rustiger/minder gedetailleerd
// te maken: gebouwen, wandel-/fietspaden, spoor, en straatnaam-labels.
// Alleen de hoofd-wegenlijnen (road-simple/bridge-simple/tunnel-simple) en
// de buurt-/plaatsnamen (place_label) blijven staan voor herkenbaarheid.
const HIDDEN_LAYER_IDS = new Set([
  'building',
  'tunnel-path-trail', 'tunnel-path-cycleway-piste', 'tunnel-path', 'tunnel-steps', 'tunnel-pedestrian',
  'road-path-trail', 'road-path-cycleway-piste', 'road-path', 'road-steps', 'road-pedestrian', 'road-rail',
  'bridge-path-trail', 'bridge-path-cycleway-piste', 'bridge-path', 'bridge-steps', 'bridge-pedestrian', 'bridge-rail',
  'road-label-simple',
]);
const HIDDEN_SOURCE_LAYERS = new Set(['natural_label', 'airport_label', 'poi_label']);

export function applyBrandMapStyle(map) {
  const layers = map.getStyle()?.layers || [];
  layers.forEach((layer) => {
    const sl = layer['source-layer'];
    try {
      if (HIDDEN_LAYER_IDS.has(layer.id) || HIDDEN_SOURCE_LAYERS.has(sl)) {
        map.setLayoutProperty(layer.id, 'visibility', 'none');
      } else if (layer.type === 'background') {
        map.setPaintProperty(layer.id, 'background-color', BRAND_MAP_COLORS.background);
      } else if (sl === 'water' && layer.type === 'fill') {
        map.setPaintProperty(layer.id, 'fill-color', BRAND_MAP_COLORS.water);
      } else if (sl === 'landuse' && layer.type === 'fill') {
        map.setPaintProperty(layer.id, 'fill-color', BRAND_MAP_COLORS.landuse);
      } else if (sl === 'road' && layer.type === 'line') {
        map.setPaintProperty(layer.id, 'line-color', BRAND_MAP_COLORS.road);
        map.setPaintProperty(layer.id, 'line-opacity', 0.55);
      } else if (layer.type === 'symbol') {
        map.setPaintProperty(layer.id, 'text-color', BRAND_MAP_COLORS.text);
        map.setPaintProperty(layer.id, 'text-halo-color', BRAND_MAP_COLORS.textHalo);
        map.setPaintProperty(layer.id, 'text-halo-width', 1.2);
      }
    } catch (e) {
      // Sommige paint-properties bestaan niet voor elk laagtype — negeren.
    }
  });
}
