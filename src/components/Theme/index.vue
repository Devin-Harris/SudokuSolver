<template>
<div class="theme_container">
  <div @click="themeSelection" class="selectedValue" :class="activeTheme">
    <div class="selected_text">
      <p>Theme:</p>
      <p>{{ activeTheme }}</p>
    </div>
    <i class="fas fa-angle-down"></i>
  </div>
  <ul class="selection_container">
    <li @click="themeChange(theme)" v-for="(theme, index) in themes" :class="index == themes.length - 1 ? 'lastTheme' : ''" :key="theme">
      {{ theme.themeName }}
    </li>
  </ul>
</div>
</template>

<script src="./Theme.js"></script>

<style src="./Theme.scss" lang="scss"></style>
