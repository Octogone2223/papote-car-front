<template>
    <div class="wrapper">
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
  
    #checkIcon{
      font-size: 5rem
    }
  
  
  </style>