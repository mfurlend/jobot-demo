<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="shadow-8">
      <q-toolbar class="bg-custom-blue-dark">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="fas fa-bars"/>
        </q-btn>

        <q-toolbar-title>
          Crypto Viewer
        </q-toolbar-title>

        <q-btn
          style="background: #36384c"
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fas fa-compress' : 'fas fa-expand'"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      style="background: #2B2D3E;"
      v-model="leftDrawerOpen"
      content-class="bg-custom-blue-dark"
      :breakpoint="400"
      overlay
      elevated
      behavior="mobile"
    >
      <q-scroll-area style="height: calc(100% - 150px);">
        <q-list class="text-white">
          <q-item-label header>Menu</q-item-label>
          <q-item clickable to="/BTCUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/btc"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>BTCUSDT</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/ETHUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/eth"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>ETHUSDT</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/BNBUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/bnb"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>BNBUSDT</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/DOGEUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/doge"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>DOGEUSDT</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/XRPUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/xrp"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>XRPUSDT</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/DOTUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/dot"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>DOTUSDT</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable to="/UNIUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/uni"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>UNIUSDT</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/BCHUSDT" exact active-class="text-purple-3">
            <q-item-section avatar>
              <img class="crypto-icon" src="https://cryptoicon-api.vercel.app/api/icon/bch"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>BCHUSDT</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      leftDrawerOpen: false,
    };
  }
};
</script>

<style>
.bg-custom-blue-dark {
  background: #2B2D3E;
}
.crypto-icon {
  width: 24px;
  height: 24px;
}
</style>
