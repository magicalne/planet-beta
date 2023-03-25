<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDisplayMedia } from '@vueuse/core'
const video = ref<HTMLVideoElement>()
const { stream, enabled } = useDisplayMedia()

const peerConnection = new RTCPeerConnection() // with local peer
stream.value?.getTracks().forEach(track => {
  peerConnection.addTrack(track);
});
//const offer = await peerConnection.createOffer();
//console.log(`offer: ${JSON.stringify(offer, null, 2)}`)
const localDescription = peerConnection.localDescription
console.log(`local description: ${JSON.stringify(localDescription, null, 2)}`)
//await peerConnection.setLocalDescription(offer);

watchEffect( () => {
  if (video.value) {
    video.value.srcObject = stream.value!
  }

  if (enabled.value) {
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <div>
      <button @click="enabled = !enabled">
        {{ enabled ? 'Stop' : 'Start' }} sharing my screen
      </button>
    </div>

    <div>
      <video
        ref="video"
        muted
        autoplay
        controls
        class="video"
      />
    </div>
  </div>
</template>

<style>
.video {
  height: 50%;
  width: 50%;
}
</style>

