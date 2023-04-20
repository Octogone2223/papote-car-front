<template>
  <div class="wrapper">
    <transition>
      <div name="slide-fade" mode="out-in" class="transition-wrapper">
        <div v-if="currentStep === 1">
          <h1>Mes trajets</h1>
          <div v-if="availableTravels && availableTravels.length" v-for="(travel, index) in availableTravels"
            :key="index">
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
        <div v-if="currentStep === 2">
          <div class="profil-view">
            <Button class="p-button-text" @click="currentStep = currentStep - 1; changeStep(currentStep)"
              icon="pi pi-arrow-left" />
            <p>
              Nantes, France <i class="pi pi-arrow-right"></i> Paris, France
              <br />1 passager
            </p>
          </div>
          <h2>Information du trajet</h2>
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
import { getReservations, getReservationsDetails, postReservation } from '@/api/reservation';

const { transitionPxInit, transitionPx, currentStep, changeStep } = UseTransitionOnStep;
changeStep(1);

interface suggestion {
  label: string;
  center: number[];
}

const availableTravels = ref<any[]>([])
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


const selectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
  changeStep(2);
};


const getTravelAndReservations = async () => {
  try {
    const travelsData = await getTravelsUser();
    const travelsDataDetails: any[] = [];
    for (const travelData of travelsData) {
      await getTravelsDetails(travelData.id).then(res => {
        travelsDataDetails.push(res);
      });
    }

    const reservationsData = await getReservations();

    availableTravels.value = [...travelsDataDetails, ...reservationsData];
    console.log('Travel data:', availableTravels);
  } catch (error) {
    console.error('Error fetching travel data:', error);
  }
};
getTravelAndReservations();

const handleAddReservation = async () => {
  try {
    const reservationData = await postReservation(selectedTravel.value?.steps[0].id);
    console.log('Reservation data:', reservationData);
  } catch (error) {
    console.error('Error fetching reservation data:', error);
  }
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
  margin-bottom: 10px;
}
</style>
