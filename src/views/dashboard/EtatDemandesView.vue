<template>
  <div class="etat-demandes">
    <h1>État des Demandes</h1>
    <EtatDemandes />
  </div>
</template>

<script>
import EtatDemandes from "@/components/dashboard/EtatDemandes.vue";

export default {
  name: "EtatDemandesView",
  components: {
    EtatDemandes,
  },
};
</script>

<style scoped>
.etat-demandes {
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
