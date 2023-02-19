<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <div v-if="currentStep === 1">
        <h1>Que cherchez vous ?</h1>
        <form>
          
          <div>
            <label for="start">Départ:</label>
            <div>
              <GMapAutocomplete 
              :force-validation="forceValidation"
              v-model="traject.startingPoint" />
            </div>
          </div>
          
          <label for="destination">Destination:</label>
          <div>
            <GMapAutocomplete
            :force-validation="forceValidation"
            v-model="traject.endingPoint"
             />
          </div>
          <div>
            <label for="date">Date:</label>
            <Calendar v-model="traject.date" :showTime="true" id="date" />
          </div>
          <div>
            <label for="passengers">Nombre de voyageurs:</label>
            <InputNumber
              v-model="traject.nbPassengers"
              type="number"
              id="passengers"
              name="passengers"
            ></InputNumber>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <div class="profil-view">
          <Button
            class="p-button-text"
            @click="$router.go(-1)"
            icon="pi pi-arrow-left"
          />
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
        
        <div>
          <Card>
            <template #content>
              <Timeline :value="events">
                <template #opposite="slotProps">
                  {{ slotProps.item.date }}
                </template>
                <template #content="slotProps">
                  {{ slotProps.item.status }}
                </template>
              </Timeline>
            </template>
          </Card>
        </div>
      </div>

      <div v-else-if="currentStep === 3">
        <h2>00/00/0000 00:00</h2>
        <br />
        <Timeline :value="events">
          <template #opposite="slotProps">
            {{ slotProps.item.date }}
          </template>
          <template #content="slotProps">
            {{ slotProps.item.status }}
          </template>
        </Timeline>
        <div class="conducteur">
          <div class="avatar">
            <p>Jhon Does</p>
            <Avatar
              label="A"
              size="xlarge"
              class="avatar"
              style="background: var(--primary-color); color: white"
            />
            <i class="pi pi-angle-right"></i>
            <br /><br />
            <href> Contacter Jhon Does</href>
          </div>
        </div>
      </div>

      <div v-else-if="currentStep === 4">
        <h2>Vérifiez vos informations de réservations</h2>
        <br />
        <Timeline :value="events">
          <template #opposite="slotProps">
            {{ slotProps.item.date }}
          </template>
          <template #content="slotProps">
            {{ slotProps.item.status }}
          </template>
        </Timeline>
      </div>

      <div v-else-if="currentStep === 5">
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
    <StepIndicator
      :steps="5"
      @change-step="(step) => changeStep(step)"
      class="stepper"
      :handler="handleValidation"
    />
  </div>
</template>

<script setup lang="ts">

import { travelApi } from '@/api';
import { UseTransitionOnStep } from '@/composables';
import { stringify } from 'querystring';
const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;

const isShowingNewTrajectStep = ref(false);

interface suggestion {
  label: string;
  center: number[];
}

var events = [
  {
    status: "Nantes",
    date: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    color: "#9C27B0",
    image: "game-controller.jpg",
  },
  {
    status: "Paris",
    date: "15/10/2020 14:00",
    icon: "pi pi-cog",
    color: "#673AB7",
  },
  {
    status: "Lion",
    date: "15/10/2020 16:15",
    icon: "pi pi-shopping-cart",
    color: "#FF9800",
  },
  {
    status: "New-York",
    date: "16/10/2020 10:00",
    icon: "pi pi-check",
    color: "#607D8B",
  },
];

const today = new Date();
const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
const time = today.getHours() + ":" + today.getMinutes();

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

const handleValidation = () => {
  if (currentStep.value === 1 &&
    traject.value.startingPoint === null &&
    traject.value.endingPoint === null &&
    traject.value.date === '' &&
    traject.value.nbPassengers === null) {
    forceValidation.value = true;
    return false;
  }
  
  forceValidation.value = false;
  return true;
};


const handleSearchTravel = async () => {
  //TODO : when the API will be ready, update this part
  const body = {
    smoker: false,
    petAccepted: false,
    startingPoint: '',
    endingPoint:''
  } as any;
  //const travel = await travelApi.getTravels(traject.value);
};

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

.filter{
  display:flex;
  padding:10px;
  align-items: center;
  justify-content: center;
  width:100%;

  td{
    >label{
      padding-right:4px;
      padding-left:5px;
    }
  }
}

</style>
