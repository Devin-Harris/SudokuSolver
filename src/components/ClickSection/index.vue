<template>
  <div class="section_container">
    <div class="click_section">
      <i v-if="isDropDown && isOpen" class="fas fa-angle-left"></i>
      <h4>{{ section.message }}</h4>
      <i v-if="isDropDown && !isOpen" class="fas fa-angle-right"></i>
      <i
        v-else-if="
          !isDropDown && !isOpen && section.message == 'Solve the puzzle...'
        "
        class="fas fa-check"
      ></i>
      <i
        v-else-if="
          !isDropDown && !isOpen && section.message == 'Reset the board...'
        "
        class="fas fa-backward"
      ></i>
      <i
        v-else-if="
          !isDropDown &&
            !isOpen &&
            section.message == 'This is an invalid puzzle!'
        "
        class="fas fa-times"
      ></i>
    </div>
    <div v-if="isOpen && isDropDown" class="content" @click.stop>
      <p v-for="paragraph in content" :key="paragraph">
        {{ paragraph }} <br /><br />
      </p>
      <p id="githubText" v-if="section.section == 'works'" @click="githubRD">
        You can see the code on my <span>github</span>
      </p>
    </div>
  </div>
</template>

<script src="./ClickSection.js"></script>

<style src="./ClickSection.scss" lang="scss"></style>
