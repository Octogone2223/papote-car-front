<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentStep === 1">
        <form>
          <label for="start">Départ:</label>
          <div>
            <GMapAutocomplete :show-map=false  />
          </div>
          <label for="destination">Destination:</label>
          <div>
            <GMapAutocomplete :show-map=false  />
          </div>
          
          
          <!-- <InputText
            id="destination"
            v-model="destination"
            aria-describedby="destination"
            @keydown.enter=""
            autocomplete="destination"
          /> -->

          <div>
            <label for="date">Date:</label>
            <Calendar v-model="date" :showTime="true" id="date" />
          </div>

          <label for="passengers">Nombre de voyageurs:</label>
          <InputNumber 
            v-model="passengers"
            type="number"
            id="passengers"
            name="passengers"></InputNumber>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <div>
          <Card>
            <template #content>
              <Timeline :value="events">
                <template #opposite="slotProps">
                  {{slotProps.item.date}}
                </template>
              <template #content="slotProps">
                {{slotProps.item.status}}
              </template>
            </Timeline>
            </template>
          </Card>
        </div>
      </div>

      <div v-else-if="currentStep === 3">
        <div>
          <Card>
            <template #content>
              <Timeline :value="events">
                <template #opposite="slotProps">
                  {{slotProps.item.date}}
                </template>
              <template #content="slotProps">
                {{slotProps.item.status}}
              </template>
            </Timeline>
            </template>
          </Card>
        </div>
      </div>

      <div v-else-if="currentStep === 4">
        <div>
          <Card>
            <template #content>
              <Timeline :value="events">
                <template #opposite="slotProps">
                  {{slotProps.item.date}}
                </template>
              <template #content="slotProps">
                {{slotProps.item.status}}
              </template>
            </Timeline>
            </template>
          </Card>
        </div>
      </div>

      <div v-else-if="currentStep === 5">
        <h1>Réservation envoyée</h1>
        <div><i class="pi pi-check-circle"></i></div>
        <p>
          Votre réservation a été envoyé à  * Nom conducteur *.
          Vous recevrez un e-mail dès que votre trajet sera validé.
        </p>
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

  
 const events = [
                {status: 'Nantes', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg'},
                {status: 'Paris', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7'},
                {status: 'Lion', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800'},
                {status: 'New-York', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B'}
            ]

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


</style>