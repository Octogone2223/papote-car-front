<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentStep === 1">
        <form>
          <label for="destination">Destination:</label>
          <div>
            <GMapAutocomplete show-map=false  />
          </div>
          
          
          <!-- <InputText
            id="destination"
            v-model="destination"
            aria-describedby="destination"
            @keydown.enter=""
            autocomplete="destination"
          /> -->
            <div id="param2">
              <div class="bicolumn">
                <label for="date">Date:</label>
                <Calendar v-model="date" :showTime="true" id="date"  />
              </div>
              <div class="bicolumn">
                <label for="passengers">Nombre de voyageurs:</label>
                <InputNumber 
                  v-model="passengers"
                  type="number"
                  id="passengers"
                  name="passengers"></InputNumber>
              </div>
            </div>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        
      </div>

      <div v-else-if="currentStep === 3">
        
      </div>

      <div v-else-if="currentStep === 4">
        
      </div>

      <div v-else-if="currentStep === 5">
        
      </div>
    </transition>
    <StepIndicator
      :steps="5"
      @change-step="(step) => changeStep(step)"
      class="stepper"
    /> 
  </div>
  
      <!-- <div v-if="trips.length">
        <h2>Résultats de la recherche</h2>
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Date</th>
              <th>Nombre de voyageurs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips" :key="trip.id">
              <td>{{ trip.destination }}</td>
              <td>{{ trip.date }}</td>
              <td>{{ trip.passengers }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
 
</template>
  
<script setup lang="ts">
import { UseTransitionOnStep } from '@/composables';
const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;
</script>
  
<style scoped lang="scss">
  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;

    > .stepper {
      margin: auto auto 0 auto;
    }
  }

  .slide-fade-enter-from {
    transform: translateX(v-bind(transitionPxInit));
    opacity: 0;
  }
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-to {
    transform: translateX(v-bind(transitionPx));
    opacity: 0;
  }

  #param2 {
    display: flex;
    width: 100%;
    margin:auto;
  }

  .bicolumn{
    width:50%;
  }
</style>