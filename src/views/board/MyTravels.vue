<template>
  <div class="wrapper">
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
</template>
<script setup lang="ts">
import { getTravels, getTravelsUser, getTravelsDetails } from '@/api/travel';
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


const selectTravel = (travel: Travel) => {
  selectedTravel.value = travel;
};


const handleGetTravel = async () => {
  try {
    const travelsData = await getTravelsUser();
    let travelsDataDetails: any[] = [];
    for (let travelData of travelsData) {
      await getTravelsDetails(travelData.id).then(res => {
        travelsDataDetails.push(res);
      });
    }
    console.log('Travel data:', travelsData);
    availableTravels.value = travelsDataDetails;
  } catch (error) {
    console.error('Error fetching travel data:', error);
  }
};
handleGetTravel();

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
