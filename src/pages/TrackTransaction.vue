<template>
    <div class="max-w-4xl mx-auto my-10 p-5">
      <div class="bg-white rounded-lg shadow-lg p-5 mb-5">
        <div class="flex justify-between items-center">
          <h2 class="font-semibold text-xl">Order Progress</h2>
        </div>
  
        <!-- Progress Bar -->
        <div class="mt-8 flex items-center justify-between">
          <!-- Step 1: Confirmed Order -->
          <div :class="['flex items-center', getStepClass(1)]">
            <div class="w-10 h-10 flex items-center justify-center rounded-full">
              <i class="fas fa-box-open text-white"></i>
            </div>
            <p class="ml-2">Confirmed Order</p>
          </div>
          <!-- Step 2: Processing Order -->
          <div :class="['flex items-center', getStepClass(2)]">
            <div class="w-10 h-10 flex items-center justify-center rounded-full">
              <i class="fas fa-cogs text-white"></i>
            </div>
            <p class="ml-2">Processing Order</p>
          </div>
          <!-- Step 3: Quality Check -->
          <div :class="['flex items-center', getStepClass(3)]">
            <div class="w-10 h-10 flex items-center justify-center rounded-full">
              <i class="fas fa-check-circle text-white"></i>
            </div>
            <p class="ml-2">Quality Check</p>
          </div>
          <!-- Step 4: Dispatched Item -->
          <div :class="['flex items-center', getStepClass(4)]">
            <div class="w-10 h-10 flex items-center justify-center rounded-full">
              <i class="fas fa-truck text-white"></i>
            </div>
            <p class="ml-2">Dispatched Item</p>
          </div>
          <!-- Step 5: Product Delivered -->
          <div :class="['flex items-center', getStepClass(5)]">
            <div class="w-10 h-10 flex items-center justify-center rounded-full">
              <i class="fas fa-users text-white"></i>
            </div>
            <p class="ml-2">Product Delivered</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Current step, 1 - Confirmed, 2 - Processing, etc.
  const currentStep = ref(3);
  
  // Function to determine the step class based on the current step
  const getStepClass = (step) => {
    if (step < currentStep.value) {
      return 'bg-green-500'; // Completed step
    } else if (step === currentStep.value) {
      return 'bg-blue-500'; // Active step
    } else {
      return 'bg-gray-500'; // Inactive step
    }
  };
  </script>
  
  <style scoped>
  /* Optional: Add any additional custom styles */
  </style>
  