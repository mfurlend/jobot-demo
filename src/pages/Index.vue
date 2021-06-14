<template>
  <q-page class="flex flex-center">

    <BinanceCandles :symbol="symbol"></BinanceCandles>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import BinanceCandles from 'components/BinanceCandles';
import {useRoute} from 'vue-router';

export default defineComponent({
  name: 'PageIndex',
  components: {BinanceCandles},
  props: {
    symbol: {
      type: String,
      required: true
    }
  }
});
</script>
