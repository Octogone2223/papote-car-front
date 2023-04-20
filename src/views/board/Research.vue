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
          <Button class="p-button-text"
            @click="
              currentStep = currentStep - 1;
            changeStep(currentStep);
                                                                                                                                                                                              "
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
              <Timeline :value="travel.steps">
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
          Votre réservation a été envoyé au conducteur. Vous recevrez un e-mail
          dès que votre trajet sera validé.
        </p>
        <router-link class="redirectEnd" to="/my-travels">
          <Button> Mes trajets </Button>
        </router-link>
      </div>
    </transition>
    <StepIndicator v-if="currentStep == 1" :steps="4" :currentStep="1" @change-step="(step) => changeStep(2)"
      class="stepper" :handler="handleValidation" />
    <StepIndicator v-if="currentStep == 3" :steps="4" :currentStep="3" @change-step="(step) => changeStep(4)"
      class="stepper" :handler="handleValidation" />
  </div>
</template>
<script setup lang="ts">
import { getTravels } from '@/api/travel';
import { UseTransitionOnStep } from '@/composables';
import { GetTravelInput } from '@/types/inputs/travel.input';
import { watchEffect } from 'vue';
import { Travel } from '@/types';
import { postReservation } from '@/api/reservation';
import { PostTravelOutput } from '@/types/outputs/travel.output';
import { chatApi } from '@/api';
import { useSocketIO } from '@/composables/use-socket-io';
import { toastCustomError } from '@/utils/errors-handler';
import { toast } from 'vue-sonner';

const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;
changeStep(1);

interface suggestion {
  label: string;
  center: number[];
}

const availableTravels = ref<Travel[]>([]);
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

const userSearched = ref('');

const handleSearchTravel = async () => {
  const today = new Date();
  const dateTemp =
    today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
  const time = today.getHours() + ':' + today.getMinutes();

  traject.value.date = dateTemp + ' ' + time;

  const petAccepted = traject.value.petAccepted;
  const smoker = traject.value.smoker;
  const date = traject.value.date;
  const townStart = traject.value.startingPoint?.label || '';
  const townEnd = traject.value.endingPoint?.label || '';

  try {
    const travelsData = await getTravels({
      petAccepted: petAccepted,
      smoker: smoker,
      date: date,
      townStart: townStart,
      townEnd: townEnd,
    });
    let travelDataFormated = [];

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDate = date.toLocaleString("fr-FR", options);
    for (let travelData of travelsData) {
      if (travelData.steps.length === 1) {
        const finalStep = travelData.steps[0];
        travelData.steps.push({}); // Ajoute une deuxième étape vide
        travelData.steps[1].dateStart = finalStep.dateStart;
        travelData.steps[1].townStart = finalStep.townEnd; // Ville de départ de la deuxième étape = Ville d'arrivée de la première étape
        travelData.steps[1].id = finalStep.id;
      }
      for (const step of travelData.steps) {
        const date = new Date(step.dateStart);
        step.dateStart = date.toLocaleString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      console.log('Travel data:', travelData);
      travelDataFormated.push(travelData);
      userSearched.value = travelData.steps[0].driver.id;
    }

    availableTravels.value = travelDataFormated;
  } catch (error) {
    console.error('Error fetching travel data:', error);
  }
};

const handleAddReservation = async () => {
  try {
    if (selectedTravel && selectedTravel.value) {
      let idStartStep: string = '';
      let idEndStep: string = '';
      for (const tempsStep of selectedTravel.value.steps) {
        if (traject.value.startingPoint?.label === tempsStep.townStart) {
          idStartStep = tempsStep.id;
        } else if (traject.value.endingPoint?.label === tempsStep.townStart) {
          idEndStep = tempsStep.id;
        }
        console.log(traject.value.endingPoint?.label);
        console.log(tempsStep);
      }

      const reservationData = await postReservation(
        { stepId1: idStartStep, stepId2: idEndStep },
        selectedTravel.value.id
      ).catch(() =>
        toastCustomError('Une erreur est survenue lors de la réservation du trajet')
      );

      toast.success('Réservation envoyée');

      await chatApi.postMessage(userSearched.value);

      console.log('Reservation data:', reservationData);
    }
  } catch (error) {
    console.error('Error fetching reservation data:', error);
  }
};

watchEffect(() => {
  if (currentStep.value === 2) {
    handleSearchTravel();
  } else if (currentStep.value === 4) {
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

  div {
    .redirectEnd {
      display: flex;
      align-items: center;
      justify-content: center;
    }
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
