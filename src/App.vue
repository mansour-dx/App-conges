<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
:root {
  /* Couleurs SENELEC */
  --primary-color: #008a9b; /* Bleu-vert */
  --secondary-color: #261555; /* Violet foncé */
  --tertiary-color: #100644; /* Bleu très foncé */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body,
html {
  font-family: "Roboto", Arial, sans-serif;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
  width: 100%;
  color: #333;
}

button {
  cursor: pointer;
}

input,
button {
  font-family: inherit;
}
</style>
