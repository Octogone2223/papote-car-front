const currentStep = ref(1);
const transitionPxInit = ref('100px');
const transitionPx = ref('-100px');

const changeStep = (step: number) => {
  if (step > currentStep.value) {
    transitionPxInit.value = '100px';
    transitionPx.value = '-100px';
  } else {
    transitionPxInit.value = '-100px';
    transitionPx.value = '100px';
  }
  currentStep.value = step;
};

export { currentStep, transitionPxInit, transitionPx, changeStep };
