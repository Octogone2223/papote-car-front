<template>
  <div>
    <AutoComplete
      type="text"
      v-model="search"
      :suggestions="suggestions"
      option-label="label"
      option-value="value"
      @item-select="onSelect"
      @focus="canCallApi = true"
      @complete="getSuggestions"
      style="width: 100%; margin: 1rem 0 2rem"
      placeholder="Rechercher une adresse"
    />
    <MapboxMap
      v-if="showMap === true"
      style="height: 400px"
      access-token="pk.eyJ1Ijoia2F5bWthc3NhaTI2OSIsImEiOiJjbDlpZnBkemMwN2prM3V0NWY4aWp6bjF2In0.gAVDArLVqLnjG4o1Uttgkw"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="mapCoords"
      :zoom="15"
    >
      <MapboxMarker :lng-lat="mapCoords" />
    </MapboxMap>
  </div>
</template>

<script setup lang="ts">
import { MAPBOX_API_KEY } from '~/config';
import { MapBoxSuggestion } from '@/types';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Ref } from 'vue';

const search = ref('');
const suggestions = ref<suggestion[]>([]);
const mapCoords = ref([-1.553621, 47.218371]); // Nantes by default (no active geolocation)
const canCallApi = ref(true);

const onSelect = (suggestion: Ref<suggestion>) => {
  mapCoords.value = suggestion.value.center;
  canCallApi.value = false;
};

interface suggestion {
  label: string;
  center: number[];
}

const props = defineProps(
  {
    showMap:{
      type:Boolean,
      default:true
    }
  }
)

const getSuggestions = async () => {
  if (!canCallApi.value) return;

  const { features }: { features: MapBoxSuggestion[] } = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.value}.json?limit=10&proximity=ip&types=place%2Cpostcode%2Caddress&language=fr&access_token=${MAPBOX_API_KEY}`
  ).then(async (res) => await res.json());

  suggestions.value = features.map((feature) => ({
    label: feature.place_name_fr,
    center: feature.center,
  }));
};
</script>
