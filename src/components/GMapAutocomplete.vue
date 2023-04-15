<template>
  <div class="gMapAutocomplete" :class="{ mapVisible }">
    <AutoComplete
      type="text"
      v-model="search"
      :suggestions="suggestions"
      option-label="label"
      option-value="value"
      @item-select="(e: AutoCompleteItemUnselectEvent) => onSelect(e)"
      @focus="canCallApi = true"
      @complete="getSuggestions"
      style="width: 100%; margin: 1rem 0 0 0"
      placeholder="Rechercher une adresse"
      :class="{
        'p-invalid': v$.search.$error,
      }"
    />
    <div v-on:click="toggleMap()" class="rightIcon">
      <i class="pi pi-map" id="checkIcon" :class="{ canShowMap }"></i>
    </div>
  </div>
  <div>
    <ErrorsHandler :errors="v$.search.$errors" />
  </div>
  <transition name="slide-fade" appear :key="canShowMap">
    <div v-if="canShowMap">
      <MapboxMap
        class="boxMap"
        access-token="pk.eyJ1Ijoia2F5bWthc3NhaTI2OSIsImEiOiJjbDlpZnBkemMwN2prM3V0NWY4aWp6bjF2In0.gAVDArLVqLnjG4o1Uttgkw"
        map-style="mapbox://styles/mapbox/streets-v11"
        :center="mapCoords"
        :zoom="15"
      >
        <MapboxMarker :lng-lat="mapCoords" />
      </MapboxMap>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { MAPBOX_API_KEY } from '~/config';
import { MapBoxSuggestion } from '@/types';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Ref } from 'vue';
import { helpers, required as requiredR } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { AutoCompleteItemUnselectEvent } from 'primevue/autocomplete';

const search = ref('');
const suggestions = ref<suggestion[]>([]);
const mapCoords = ref([-1.553621, 47.218371]); // Nantes by default (no active geolocation)
const canCallApi = ref(true);

/* VALIDATIONS */
const rules = {
  search: {
    required: helpers.withMessage('Champ requis', requiredR),
  },
};

const v$ = useVuelidate(
  rules,
  { search },
  {
    $autoDirty: true,
  }
);

const emits = defineEmits(['item-select']);

const onSelect = async (suggestion: AutoCompleteItemUnselectEvent) => {
  mapCoords.value = suggestion.value.center;
  canCallApi.value = false;
  emits('item-select', suggestion.value);
};

interface suggestion {
  label: string;
  center: number[];
}

const props = defineProps({
  mapVisible: {
    type: Boolean,
    default: false,
  },
  forceValidation: {
    type: Boolean,
    default: false,
  },
});

const canShowMap = ref(props.mapVisible);

const toggleMap = async () => {
  canShowMap.value = !canShowMap.value;
};

watch(
  () => props.forceValidation,
  async (forceValidation) => {
    if (forceValidation) {
      await v$.value.$validate();
    }
  }
);

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
<style lang="scss">
.mapboxgl-control-container {
  display: none;
}

.boxMap.mapboxgl-map {
  border-radius: 6px;
  border: 1px solid #cfd4d9;
  margin: 2rem 0;
}

.gMapAutocomplete {
  display: flex;

  .rightIcon {
    width: 45px;
    margin: 1rem 0px 0px;
    font-size: 1rem;
    color: #495057;
    background: #ffffff;
    padding: 0.75rem 0.75rem;
    border: 1px solid #ced4da;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    cursor: pointer;

    i {
      color: #14b8a6;
    }
  }
  input {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .active,
  .mapboxMap:hover {
    background-color: #ccc;
  }
}

.slide-fade-enter-from {
  height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-active {
  height: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-leave-to,
.slide-fade-enter-active {
  height: auto;
}

.boxMap {
  height: 400px;
  overflow: hidden;
  transition: height 0.4s ease;
}

.slide-fade-enter-active .boxMap,
.slide-fade-leave-active .boxMap {
  height: auto;
  transition: height 0.4s ease;
}

.rightIcon i {
  color: #14b8a6;
  transition: transform 0.3s ease;
}

.gMapAutocomplete i.canShowMap {
  transform: rotate(90deg);
}
</style>
