<template>
  <div class="fixed z-30 bg-black bg-opacity-10 top-0 bottom-0 left-0 right-0">
    <transition name="side-modal">
      <div
        v-show="contentRendered"
        class="absolute top-0 bottom-0 right-0 left-0 sm:left-auto bg-white sm:w-96"
      >
        <div class="p-4 flex items-center justify-between space-x-4">
          <div class="flex items-center space-x-3">
            <p class="text-body-1">
              {{ title }}
            </p>
            <transition name="fade">
              <BaseSpinner v-show="loading" />
            </transition>
          </div>

          <button
            class="flex-shrink-0 flex items-center justify-center"
            @click="$emit('close-clicked')"
          >
            <em class="icon-close text-2xl" />
          </button>
        </div>
        <hr class="mb-4" />
        <div class="px-4 overflow-x-hidden overflow-y-auto">
          <slot />
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between space-x-4"
        >
          <BaseButton
            v-if="confirmable"
            text="Confirm"
            background-color="bg-transparent"
            border-color="border-white"
            text-color="text-purple-600"
            class="flex-shrink-0"
            :disabled="loading"
            @clicked="$emit('confirm-clicked')"
          />
          <BaseButton
            v-if="removable"
            text="Remove"
            background-color="bg-transparent"
            border-color="border-white"
            text-color="text-red-800"
            class="flex-shrink-0"
            :disabled="loading"
            @clicked="$emit('remove-clicked')"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// Components
import BaseSpinner from '~/base-components/BaseSpinner.vue'
import BaseButton from '~/base-components/BaseButton.vue'

export default Vue.extend({
  components: { BaseButton, BaseSpinner },
  props: {
    title: {
      type: String,
      default: null,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    confirmable: {
      type: Boolean,
      default: false
    },

    removable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      contentRendered: false
    }
  },

  created() {
    setTimeout(() => (this.contentRendered = true), 200)
  }
})
</script>

<style scoped>
.side-modal-enter-active {
  animation: growOut 250ms ease-in-out forwards;
  transform-origin: right center;
}

.side-modal-leave-active {
  animation: growIn 100ms ease-in-out forwards;
  transform-origin: right center;
}

@keyframes growOut {
  0% {
    transform: rotateY(-90deg);
  }
  70% {
    transform: rotateY(10deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}

@keyframes growIn {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-90deg);
  }
}
</style>
