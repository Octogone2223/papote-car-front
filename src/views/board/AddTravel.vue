<template>
  <div class="wrapper">
    <transition name="slide-fade" mode="out-in" class="transition-wrapper">
      <!-- ETAPE 1 -->
      <div v-if="currentStep === 1">
        <h1>D'où partez vous ?</h1>
        <div>
          <GMapAutocomplete :force-validation="forceValidation" :map-visible="true"
            @item-select="(v: suggestion) => pushToTraject('startingPoint', v)" />
        </div>
      </div>

      <!-- ETAPE 2 -->
      <div v-else-if="currentStep === 2">
        <h1>Où allez vous ?</h1>
        <div>
          <GMapAutocomplete :force-validation="forceValidation" :map-visible="true"
            @item-select="(v: suggestion) => pushToTraject('endingPoint', v)" />
        </div>
      </div>

      <!-- ETAPE 3 -->
      <div v-else-if="currentStep === 3" style="height: 100%">
        <div v-if="!isShowingNewTrajectStep">
          <h1>
            Souhaitez-vous ajouter des étapes que des passagers pourront
            réserver&nbsp;?
          </h1>

          <div style="text-align: center; margin-top: 2rem">
            <Button style="border-bottom: dotted" label="Ajouter une étape" class="p-button-text"
              @click="isShowingNewTrajectStep = true" />
          </div>
        </div>
        <div v-else style="height: inherit" class="col">
          <h1>Ajouter une étape</h1>

          <div>
            <GMapAutocomplete :force-validation="forceValidation" @item-select="
              (v: suggestion) => pushToTraject('steps', [...traject.steps, v])
            " :map-visible="true" />
          </div>

          <Button class="btn-section" label="Ajouter cette étape" @click="isShowingNewTrajectStep = false" />
        </div>
      </div>

      <!-- ETAPE 4 -->
      <div v-else-if="currentStep === 4">
        <h1>Récapitulatif de votre trajet</h1>
        <div>
          <p>Départ : {{ traject.startingPoint!.label }}</p>
          <p>Arrivée : {{ traject.endingPoint!.label }}</p>
          <p>Etapes : {{ traject.steps.length }}</p>

          <div v-if="traject.steps.length > 0">
            <p>Etapes :</p>
            <ul>
              <li v-for="step in traject.steps" :key="step.label">
                {{ step.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- ETAPE 5 -->
      <div v-else-if="currentStep === 5">
        <h1>Configurer votre trajet</h1>
        <div class="col">
          <p>Date de départ</p>
          <Calendar :showTime="true" touch-u-i v-model="traject.date" :minDate="new Date()" />
        </div>
        <div class="col">
          <p>Nombre de passagers</p>
          <InputNumber v-model="traject.nbPassengers" />
        </div>
        <div class="col">
          <p>Fumeurs autorisés</p>
          <Checkbox v-model="traject.smoker" :binary="true" />
        </div>
        <div class="col">
          <p>Animaux autorisés</p>
          <Checkbox v-model="traject.petAccepted" :binary="true" />
        </div>
        <div class="col">
          <p>Sélectionner votre voiture</p>
          <Dropdown v-model="selectedCar" :options="cars" placeholder="Sélectionner une voiture">
            <template #value="slotProps">
              <div class="p-dropdown-car-value">
                <span>{{ displayCarLabel(slotProps.value) }}</span>
              </div>
            </template>
            <template #option="slotProps">
              <div class="p-dropdown-car-value">
                <span>{{ displayCarLabel(slotProps.option) }}</span>
              </div>
            </template>
            <template #empty>
              <div>
                Aucun véhicule, en ajouter un ?
                <Button label="Ajouter un véhicule" class="p-button-text p-button-sm"
                  style="padding: 0; margin: 0; border: none" @click="isShowindAddCarModal = true" />
              </div>
            </template>
          </Dropdown>
        </div>
      </div>

      <!-- ETAPE 6 -->
      <div v-else-if="currentStep === 6">
        <h1>Vérifiez vos informations avant le départ&nbsp;!</h1>
        <div class="col">ETAPE...</div>
        <Card class="travelCard">
          <template #content>
            <Timeline :value=formatedTravel.steps>
              <template #content="slotProps">
                {{ slotProps.item.townStart }}
              </template>
            </Timeline>
          </template>
        </Card>
      </div>

      <!-- ETAPE 7 -->
      <div v-else-if="currentStep === 7">
        <h1>Vous êtes prêt à partir&nbsp;!</h1>
        <p>
          Vous pouvez consulter votre trajet dans la section "Mes trajets"
          accessible depuis le menu.
        </p>
      </div>
    </transition>

    <StepIndicator v-show="!isShowingNewTrajectStep" :steps="7" @change-step="(step: number) => changeStep(step)"
      @complete="() => handleAddTravel()" class="stepper" :handler="handleValidation" />

    <Dialog :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" header="Ajouter un véhicule"
      v-model:visible="isShowindAddCarModal" :modal="true" style="padding: 0">
      <div class="col">
        <p>Marque</p>
        <InputText type="text" v-model="carDetails.brand" :class="{
          'p-invalid': v$.car.brand.$error,
        }" @keydown.enter="() => handleAddCar" />
        <ErrorsHandler :errors="v$.car.brand.$errors" />
      </div>
      <div class="col">
        <p>Modèle</p>
        <InputText type="text" v-model="carDetails.model" :class="{
          'p-invalid': v$.car.model.$error,
        }" @keydown.enter="() => handleAddCar" />
        <ErrorsHandler :errors="v$.car.model.$errors" />
      </div>
      <div class="col">
        <p>Places</p>
        <InputNumber v-model="carDetails.place" :class="{
          'p-invalid': v$.car.place.$error,
        }" @keydown.enter="() => handleAddCar" />
        <ErrorsHandler :errors="v$.car.place.$errors" />
      </div>
      <div class="col">
        <p>Couleur</p>
        <Dropdown v-model="carDetails.color" :options="carColorsOptions" :class="{
          'p-invalid': v$.car.color.$error,
        }" @keydown.enter="() => handleAddCar" />
        <ErrorsHandler :errors="v$.car.color.$errors" />
      </div>

      <template #footer>
        <Button label="Annuler" class="p-button-text" style="margin-top: 1rem" @click="isShowindAddCarModal = false" />

        <Button label="Ajouter" icon="pi pi-check" @click="handleAddCar" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { travelApi } from '@/api';
import { UseTransitionOnStep } from '@/composables';
import router from '@/router';
import { useCarStore } from '@/stores';
import { Car, StepTravel, Travel } from '@/types';
import { toastCustomError } from '@/utils/errors-handler';
import { toast } from 'vue-sonner';
import useVuelidate from '@vuelidate/core';
import { required as requiredR, helpers } from '@vuelidate/validators';
import { PostTravelInput } from '@/types/inputs/travel.input'
import { Ref } from 'vue';

const { transitionPxInit, transitionPx, currentStep, changeStep } =
  UseTransitionOnStep;
const isShowingNewTrajectStep = ref(false);

interface suggestion {
  label: string;
  center: number[];
}

const isShowindAddCarModal = ref(false);
const carColorsOptions = [
  'black',
  'white',
  'yellow',
  'pink',
  'green',
  'darkBlue',
  'blue',
  'grey',
];

const carDetails = ref({
  brand: '',
  model: '',
  place: 3,
  color: '',
});

const generalRules = {
  brand: {
    required: helpers.withMessage(`Une marque est requise`, requiredR),
  },
  model: {
    required: helpers.withMessage(`Un modèle est requis`, requiredR),
  },
  place: {
    required: helpers.withMessage(`Un nombre de places est requis`, requiredR),
  },
  color: {
    required: helpers.withMessage(`Une couleur est requise`, requiredR),
  },
};

const rules = {
  car: generalRules,
};

const v$ = useVuelidate(
  rules,
  {
    car: carDetails.value,
  },
  {
    $autoDirty: true,
  }
);

const handleAddCar = async () => {
  const isFormValid = await v$.value.car.$validate();

  if (!isFormValid) return;

  await carsStore
    .addCar(carDetails.value)
    .catch(() =>
      toastCustomError(
        "Une erreur est survenue lors de l'ajout de votre véhicule"
      )
    );
  isShowindAddCarModal.value = false;
  toast.success('Votre véhicule a bien été ajouté');
};

const traject = ref({
  startingPoint: null as suggestion | null,
  endingPoint: null as suggestion | null,
  steps: [] as suggestion[],
  nbPassengers: null as number | null,
  date: '',
  smoker: false,
  petAccepted: false,
});

const pushToTraject = (
  key: 'startingPoint' | 'endingPoint' | 'steps',
  value: any
) => {
  traject.value[key] = value;
};

const forceValidation = ref(false);

const handleValidation = () => {
  if (currentStep.value === 1 && traject.value.startingPoint === null) {
    forceValidation.value = true;
    return false;
  }
  if (currentStep.value === 2 && traject.value.endingPoint === null) {
    forceValidation.value = true;
    return false;
  }
  if (
    currentStep.value === 5 &&
    traject.value.nbPassengers === null &&
    traject.value.date === ''
  ) {
    forceValidation.value = true;
    return false;
  }

  forceValidation.value = false;
  return true;
};

let formatedTravel: Ref<PostTravelInput> = ref({
  smoker: false,
  petAccepted: false,
  car: '',
  steps: []
});

const formatTravel = async () => {
  if (
    !selectedCar.value ||
    !traject.value.startingPoint ||
    !traject.value.endingPoint
  ) {
    return;
  }

  const formatedTrajectStep = [
    {
      stepNumber: 1,
      dateStart: traject.value.date,
      place: traject.value.nbPassengers!,
      townStart: traject.value.startingPoint.label,
      townEnd: traject.value.steps[0]?.label || traject.value.endingPoint.label,
    },
    ...traject.value.steps.map((step, i) => ({
      stepNumber: i + 2,
      dateStart: traject.value.date,
      place: traject.value.nbPassengers!,
      townStart: step.label,
      townEnd: traject.value.steps[i + 1]?.label
        ? traject.value.steps[i + 1].label
        : traject.value.endingPoint?.label || '',
    })),
    {
      stepNumber: traject.value.steps.length + 2,
      dateStart: traject.value.date,
      place: traject.value.nbPassengers!,
      townStart:
        traject.value.steps[traject.value.steps.length - 1]?.label ||
        traject.value.startingPoint.label,
      townEnd: traject.value.endingPoint.label,
    },
  ];

  if (selectedCar.value) {
    formatedTravel.value = {
      smoker: traject.value.smoker,
      petAccepted: traject.value.petAccepted,
      car: String(selectedCar.value.id),
      steps: formatedTrajectStep,
    } as PostTravelInput;
  }
}

const handleAddTravel = async () => {

  await travelApi
    .postTravel(formatedTravel.value)
    .catch(() =>
      toastCustomError('Une erreur est survenue lors de la création du trajet')
    );

  toast.success('Trajet créé avec succès');
  router.push({ name: 'board-publish' });
};

const carsStore = useCarStore();
const cars = computed(() => carsStore.cars);
const selectedCar = ref(null as Car | null);
onMounted(async () => {
  await carsStore.getCars();
  currentStep.value = 1;
});

const displayCarLabel = (car: Car) => {
  if (!car) return '';
  return `${car.model} - ${car.brand} (${car.color} - ${car.place} places)`;
};

watchEffect(() => {
  if (currentStep.value === 6) {
    formatTravel();
  }
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  >.stepper {
    margin: auto auto 0 auto;
  }
}

.btn-section {
  margin: auto auto 0 auto;
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
