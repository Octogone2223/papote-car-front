<template>
  <div class="wrapper">
    <transition>
      <div name="slide-fade" mode="out-in" class="transition-wrapper">
        <div v-if="currentStep === 1">
          <h1>Mes trajets</h1>
          <div v-if="availableTravels && availableTravels.length" v-for="(travel, index) in availableTravels"
            :key="index">
            <Card class="travelCard" @click="selectTravel(travel)">
              <template #header>
                <div class="header-wrapper">
                  <div class="title-wrapper">
                    <h2 v-if="travel.type === 'Travels'">
                      Vous êtes chauffeur
                    </h2>
                    <h2 v-else>Vous êtes passager</h2>
                  </div>
                  <div v-if="travel.type === 'Travels'" class="passengers-wrapper">
                    <h2 class="passenger-count">
                      {{ 1 }}/{{ travel.steps[0].place }}
                    </h2>
                    <span class="p-menuitem-icon pi pi-user"></span>
                  </div>
                  <div v-else class="passengers-wrapper">
                    <h2 v-if="travel.validated === false" class="passenger-count">
                      En Attente Validation
                    </h2>
                    <h2 v-else class="passenger-count">Validé</h2>
                  </div>
                </div>
              </template>
              <template #content>
                <Timeline v-if="travel.steps" :value="travel.steps">
                  <template #opposite="slotProps">
                    {{ formatISODate(slotProps.item.dateStart) }}
                  </template>
                  <template #content="slotProps">
                    {{ slotProps.item.townStart }}
                  </template>
                </Timeline>
                <Timeline v-if="travel.reservedSteps" :value="travel.reservedSteps">
                  <template #opposite="slotProps">
                    {{ formatISODate(slotProps.item.dateStart) }}
                  </template>
                  <template #content="slotProps">
                    {{ slotProps.item.townStart }}
                  </template>
                </Timeline>
              </template>
            </Card>
          </div>
        </div>
        <div v-if="currentStep === 2">
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
          <h2>Information du trajet</h2>
          <br />
          <template v-if="selectedTravel">
            <div class="travel-info">
              <div class="travel-details">
                <div class="info-item">
                  <span class="info-label">Départ :</span>
                  <span v-if="selectedTravel.type === 'Travels'">{{ selectedTravel.steps[0].townStart }}</span>
                  <span v-else>{{ selectedTravel.reservedSteps[0].townStart }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Arrivée :</span>
                  <span v-if="selectedTravel.type === 'Travels'">{{ selectedTravel.steps[selectedTravel.steps.length -
                    1].townEnd }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Date de départ :</span>
                  <span v-if="selectedTravel.type === 'Travels'">{{ formatISODate(selectedTravel.steps[0].dateStart)
                  }}</span>
                  <span v-else>{{ formatISODate(selectedTravel.reservedSteps[0].dateStart) }}</span>
                </div>
              </div>
              <div class="travel-details">
                <div class="info-item" v-if="selectedTravel.type === 'Travels'">
                  <span class="info-label">Statut :</span>
                  <span>Chauffeur</span>
                </div>
                <div class="info-item" v-else>
                  <span class="info-label">Statut :</span>
                  <span>Passager</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Places :</span>
                  <span v-if="selectedTravel.type === 'Travels'">{{ 1 }}/{{ selectedTravel.steps[0].place }}</span>
                  <span v-else>{{ 1 }}/{{ selectedTravel.reservedSteps[0].place }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Validé :</span>
                  <span>{{ selectedTravel.validated ? 'Oui' : 'Non' }}</span>
                </div>
              </div>
            </div>
            <div class="timeline-wrapper">
              <Timeline :value="selectedTravel.steps">
                <template #opposite="slotProps">
                  {{ formatISODate(slotProps.item.dateStart) }}
                </template>
                <template #content="slotProps">
                  {{ slotProps.item.townStart }}
                </template>
              </Timeline>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { getTravels, getTravelsUser, getTravelsDetails } from '@/api/travel';
import { UseTransitionOnStep } from '@/composables';
import { GetTravelInput } from '@/types/inputs/travel.input';
import { watchEffect } from 'vue';
import { Travel } from '@/types';
import {
  getReservations,
  getReservationsDetails,
  postReservation,
} from '@/api/reservation';

const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;
changeStep(1);

interface suggestion {
  label: string;
  center: number[];
}

const availableTravels = ref<any[]>([]);
const selectedTravel = ref<any>();

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

const selectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
  changeStep(2);
};

const getTravelsAndReservations = async () => {
  try {
    const travelsData = await getTravelsUser();
    const travelsDataDetails: any[] = [];
    for (const travelData of travelsData) {
      await getTravelsDetails(travelData.id).then((res) => {
        res.type = 'Travels';
        travelsDataDetails.push(res);
      });
    }

    const reservationsData = await getReservations();
    for (const reservationData of reservationsData) {
      reservationData.reservedSteps = JSON.parse(reservationData.reservedSteps);
    }

    availableTravels.value = [...travelsDataDetails, ...reservationsData];
    console.log('Travel data:', availableTravels);
  } catch (error) {
    console.error('Error fetching travel data:', error);
  }
};
getTravelsAndReservations();

const formatISODate = (stringDate: string) => {
  const date = new Date(stringDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day}/${month}/${year} à ${hours}:${minutes}`;
};
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

.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-wrapper {
  display: flex;
  align-items: center;
}

.passengers-wrapper {
  display: flex;
  align-items: center;
}

.passenger-count {
  margin-right: 8px;
}

.icon {
  width: 24px;
  height: 24px;
  background-image: url('path/to/icon.png');
  /* Remplacer le chemin d'accès à l'icône */
  background-repeat: no-repeat;
  background-size: contain;
}

.profil-view {
  font-size: 0.8rem;
  position: relative;
  background: var(--surface-100);
  border: var(--primary-color) dashed 1px;
  display: flex;
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
  margin: 1rem 0;
  padding: 1rem;
  cursor: pointer;
}

.travel-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.travel-details {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.info-label {
  font-weight: bold;
  margin-right: 8px;
}

.timeline-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
