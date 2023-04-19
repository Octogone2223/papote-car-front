<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentStep === 1">
        <h1>Que cherchez vous ?</h1>
        <form>
          <div>
            <label for="start">Départ:</label>
            <div>
              <GMapAutocomplete :force-validation="forceValidation" v-model="traject.startingPoint"
                @item-select="traject.startingPoint = $event" />
            </div>
          </div>
          <label for="destination">Destination:</label>
          <div>

            <GMapAutocomplete :force-validation="forceValidation" v-model="traject.endingPoint"
              @item-select="traject.endingPoint = $event" />
          </div>
          <div>
            <label for="date">Date:</label>
            <Calendar v-model="traject.date" :showTime="true" id="date" />
          </div>
          <div>
            <label for="passengers">Nombre de voyageurs:</label>
            <InputNumber v-model="traject.nbPassengers" type="number" id="passengers" name="passengers" />
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <div class="profil-view">
          <Button class="p-button-text" @click="currentStep = currentStep - 1; changeStep(currentStep)"
            icon="pi pi-arrow-left" />
          <p>
            Nantes, France <i class="pi pi-arrow-right"></i> Paris, France
            <br />1 passager
          </p>
        </div>
        <table class="filter">
          <th>Filtrer :</th>
          <tr>
            <td>
              <label for="start">Fumeur</label>
              <Checkbox v-model="traject.smoker" :binary="true" />
            </td>
            <td>
              <label for="start">Animal accepté</label>
              <Checkbox v-model="traject.petAccepted" :binary="true" />
            </td>
          </tr>
        </table>
        <div v-if="availableTravels && availableTravels.length" v-for="(travel, index) in availableTravels" :key="index">
          <Card class="travelCard" @click="selectTravel(travel)">
            <template #content>
              <Timeline :value=travel.steps>
                <template #opposite="slotProps">
                  {{ slotProps.item.dateStart }}
                </template>
                <template #content="slotProps">
                  {{ slotProps.item.townStart }}
                </template>
              </Timeline>
            </template>
          </Card>
        </div>
      </div>

      <!-- <div v-else-if="currentStep === 3">
        <h2>00/00/0000 00:00</h2>
        <br />
        <template v-if="selectedTravel">
          <Timeline :value="selectedTravel.steps">
            <template #opposite="slotProps">
              {{ slotProps.item.dateStart }}
            </template>
            <template #content="slotProps">
              {{ slotProps.item.townStart }}
            </template>
          </Timeline>
        </template>
        <div class="conducteur">
          <div class="avatar">
            <p>Jhon Does</p>
            <Avatar label="A" size="xlarge" class="avatar" style="background: var(--primary-color); color: white" />
            <i class="pi pi-angle-right"></i>
            <br /><br />
            <href>Contacter Jhon Does</href>
          </div>
        </div>
      </div> -->

      <div v-else-if="currentStep === 3">
        <h2>Vérifiez les informations de réservations</h2>
        <br />
        <template v-if="selectedTravel">
          <Timeline :value="selectedTravel.steps">
            <template #opposite="slotProps">
              {{ slotProps.item.dateStart }}
            </template>
            <template #content="slotProps">
              {{ slotProps.item.townStart }}
            </template>
          </Timeline>
        </template>
      </div>
      <div v-else-if="currentStep === 4">
        <h2>Réservation envoyée</h2>
        <div style="padding: 35px; text-align: center">
          <i class="pi pi-check-circle" id="checkIcon"></i>
        </div>
        <p>
          Votre réservation a été envoyé à * Nom conducteur *. Vous recevrez un
          e-mail dès que votre trajet sera validé.
        </p>
      </div>
    </transition>
    <StepIndicator v-show="currentStep !== 2" :steps="4" :currentStep="currentStep"
      @change-step="(step) => changeStep(step)" class="stepper" :handler="handleValidation" />
  </div>
</template>
<script setup lang="ts">
import { getTravels } from '@/api/travel';
import { UseTransitionOnStep } from '@/composables';
import { GetTravelInput } from '@/types/inputs/travel.input';
import { watchEffect } from 'vue';
import { Travel } from '@/types';
import { postReservation } from '@/api/reservation';

const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;

interface suggestion {
  label: string;
  center: number[];
}

const events: any = [
  // ...
];

const availableTravels = ref<Travel[]>([])
const selectedTravel = ref<Travel>();

const today = new Date();
const date =
  today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
const time = today.getHours() + ':' + today.getMinutes();

const dateTime = date + ' ' + time;

const traject = ref({
  startingPoint: null as suggestion | null,
  endingPoint: null as suggestion | null,
  nbPassengers: 1 as number,
  date: dateTime as string,
  smoker: true as boolean,
  petAccepted: true as boolean,
});

const forceValidation = ref(false);

const selectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
  changeStep(3);
};

const handleValidation = () => {
  if (
    currentStep.value === 1 &&
    traject.value.startingPoint === null &&
    traject.value.endingPoint === null &&
    traject.value.date === '' &&
    traject.value.nbPassengers === null
  ) {
    forceValidation.value = true;
    return false;
  }

  forceValidation.value = false;
  return true;
};

const handleSearchTravel = async () => {


  const today = new Date();
  const dateTemp = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes();

  traject.value.date = dateTemp + ' ' + time;

  const petAccepted = traject.value.petAccepted;
  const smoker = traject.value.smoker;
  const date = traject.value.date;
  const townStart = traject.value.startingPoint?.label || '';
  const townEnd = traject.value.endingPoint?.label || '';

  try {
    const travelData = await getTravels({
      petAccepted: petAccepted,
      smoker: smoker,
      date: date,
      townStart: townStart,
      townEnd: townEnd,
    });
    console.log('Travel data:', travelData);
    availableTravels.value = travelData;
  } catch (error) {
    console.error('Error fetching travel data:', error);
  }

};

const handleAddReservation = async () => {
  try {
    const reservationData = await postReservation(selectedTravel.value?.steps[0].id);
    console.log('Reservation data:', reservationData);
  } catch (error) {
    console.error('Error fetching reservation data:', error);
  }
};

// Call handleSearchTravel when the currentStep changes to 2.
watchEffect(() => {
  if (currentStep.value === 2) {
    handleSearchTravel();
  }
  else if (currentStep.value === 4) {
    handleAddReservation();
  }
});

</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;

  >.stepper {
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

#checkIcon {
  font-size: 5rem;
}

.profil-view {
  font-size: 0.8rem;
  position: relative;
  background: var(--surface-100);
  border: var(--primary-color) dashed 1px;
  display: flex;
}

.filter {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;

  td {
    >label {
      padding-right: 4px;
      padding-left: 5px;
    }
  }
}

.travelCard {
  margin-bottom: 10px;
}
</style>
