
import Events from './Events'
import Key from './Key'

const LIVE_STREAMING_KIND = 21111;
export default {
  sendDescription: async function (localDescription: RTCSessionDescription) {
    const e = {
      pubkey: Key.getPubKey(),
      kind:  LIVE_STREAMING_KIND,
      content: JSON.stringify(localDescription)
    }
    const eventId = await Events.publish(e)
    console.log(`event id: ${eventId}`)
  }
}
