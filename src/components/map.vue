<template>
  <div>
    <h1>{{ teste }}</h1>
    <gmaps-map>
      <gmaps-marker :position="{ lat: -27, lng: 153 }" />
    </gmaps-map>
  </div>
</template>

<script>
  import { gmapsMap, gmapsHeatmap } from 'x5-gmaps'

  export default {
    name: "HeatMap",
    components: { gmapsMap, gmapsHeatmap },
    data() {
      return {
        dados: [
          { lat: -27.41, lng: 153.01 },
          { lat: -27.42, lng: 153.02 },
          { lat: -27.48, lng: 153.08 },
          { lat: -27.49, lng: 153.09 },
        ],
        teste: "Foi?"
      }
    }
  }
</script>
