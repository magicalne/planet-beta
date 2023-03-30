<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useDisplayMedia } from '@vueuse/core'
import Streaming from '../nostr/Streaming'
const video = ref<HTMLVideoElement>()
const { stream, enabled } = useDisplayMedia()

const peerConnection = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
}) // with local peer

watchEffect(async () => {
  if (video.value) {
  video.value.srcObject = stream.value!
  stream.value?.getTracks().forEach(track => {
      peerConnection.addTrack(track);
      });
  const offer = await peerConnection.createOffer()
  await peerConnection.setLocalDescription(offer)
  peerConnection.onicecandidate = async event => {
    if (event.candidate === null) {
      console.log(`on event condidate: ${JSON.stringify(peerConnection.localDescription)}`)
      await Streaming.sendDescription(peerConnection.localDescription)
    }
  }
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

