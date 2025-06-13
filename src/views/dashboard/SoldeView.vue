<template>
  <div class="solde">
    <h1>Solde des Congés</h1>
    <SoldeConges />
  </div>
</template>

<script>
import SoldeConges from "@/components/dashboard/SoldeConges.vue";

export default {
  name: "SoldeView",
  components: {
    SoldeConges,
  },
};
</script>

<style scoped>
.solde {
  padding: 2rem;
  min-height: 100vh;
  background: #f8fafc;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  position: relative;
  text-align: center;
}

h1:after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: var(--gradient-primary);
  border-radius: 2px;
}
</style>
