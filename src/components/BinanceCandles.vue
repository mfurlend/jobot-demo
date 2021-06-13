<template>
  <div id="resolution-container">

    <div class="q-pa-md">
      <q-btn-dropdown color="primary" :label="'Resolution: ' + resolution_text">
        <q-list>
          <template v-for="item in resolutions" :key="item">
            <q-item clickable v-close-popup @click="changeResolution(item)">
              <q-item-section>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-btn-dropdown>
    </div>

  </div>
  <card-base>
    <div v-if="!error" style="height: 85vh">
      <apexchart type="candlestick" :options="chartOptions" :series="series" height="100%" ref="chart"></apexchart>
    </div>
    <div v-if="error" id="error-container">
      <div id="error-content">
        SORRY! IDK WTF!
      </div>
    </div>
  </card-base>
</template>
<style scoped>
#error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

#error-content {
  flex: 0 0 auto;
  color: white;
  font-size: 5em;
  margin-top: 10vh;
}

#resolution-container {
  margin: 1em;
}
</style>
<script>
import {api} from 'boot/axios';
import CardBase from 'components/CardBase';
//const client = Binance()
//window.client = client
window.api = api;
export default {
  name: 'BinanceCandles',
  components: {
    CardBase,
  },
  props: ['symbol'],
  computed: {
    resolution_text() {
      const resolution_letter = this.resolution[this.resolution.length - 1];
      const resolution_interval = parseInt(this.resolution);
      let resolution_text = '';
      switch (resolution_letter) {
        case 'm':
          resolution_text = 'Minute';
          break;
        case 'h':
          resolution_text = 'Hour';
          break;
        case 'd':
          resolution_text = 'Day';
          break;
        case 'w':
          resolution_text = 'Week';
          break;
        case 'M':
          resolution_text = 'Month';
          break;
      }
      if (resolution_interval != '1') {
        resolution_text += 's';
      }
      return resolution_interval + ' ' + resolution_text;
    },
  },
  data() {
    return {
      resolutions: ['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M'],
      resolution: '1m',
      error: false,
      noData: {
        text: 'Loading...',
      },
      series: [],
      chartOptions: {
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000,
        },
        title: {
          text: this.symbol + ' ' + this.resolution_text,
          align: 'left',
          style: {
            color: '#FFF',
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
          labels: {
            style: {
              colors: '#fff',
            },
          },
        },
      },
    };
  },
  methods: {
    reloadChart: function() {

      this.updateOptions();

      this.getSeries().then(({data}) => {
        const series = this.parseData(data);
        if (!this.$refs.chart) {
          this.series = series;
        } else {
          this.$refs.chart.updateSeries(series, true);
        }
        this.error = false;
        this.$q.loading.hide();
      });
    },
    getSeries: async function() {
      this.$q.loading.show();
      return api.get('/api/v3/klines', {
        params: {
          symbol: this.symbol,
          interval: this.resolution,
        },
      }).catch(error => {
        this.error = true;
        this.$q.loading.hide();
      });
    },
    parseData: function(data) {
      return [
        {
          name: this.symbol, data: data.map(o => {
            return {
              x: new Date(o[0]),
              y: [parseFloat(o[1]), parseFloat(o[2]), parseFloat(o[3]), parseFloat(o[4])],
            };
          }),
        }];

    },
    updateOptions: function() {
      this.chartOptions.title.text = this.symbol + ' ' + this.resolution_text;
      this.chartOptions = {...this.chartOptions};
    },
    changeResolution: function(resolution) {

      this.resolution = resolution;

    },
  },
  watch: {
    resolution: function(newVal, oldVal) {
      this.reloadChart();
    },
    symbol: function(newVal, oldVal) { // watch it
      this.reloadChart();

    },
  },
  beforeMount() {
    this.resolution = '1h';
  },
  mounted() {
    window.chart = this.$refs.chart;
    this.getSeries().then(({data}) => {
      this.series = this.parseData(data);
      this.error = false;
      this.$q.loading.hide();
    });
  },
};
</script>
