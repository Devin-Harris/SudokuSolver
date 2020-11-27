<template>
<div class="actions_container">
  <div class="actions_heading">
    <h1>Sudoku Solver</h1>
    <p><span>By Devin Harris</span></p>
  </div>
  <!-- <Theme /> -->
  <ClickSection @click="rulesOpen" :section="
        isRulesOpen
          ? { section: 'rules', message: 'Go Back...' }
          : { section: 'rules', message: 'Sudoku Rules...' }
      " :isDropDown="true" v-if="!isWorksOpen" :isOpen="isRulesOpen" :content="rulesContent" />
  <ClickSection @click="worksOpen" :section="
        isWorksOpen
          ? { section: 'works', message: 'Go Back...' }
          : { section: 'works', message: 'How it works...' }
      " :isDropDown="true" v-if="!isRulesOpen" :isOpen="isWorksOpen" :content="worksContent" />
  <DraggableNums v-if="!isWorksOpen && !isRulesOpen" @drag-num="dragNum" :board="board" />
  <ClickSection id="solveButton" @click="solveClick" v-if="!isWorksOpen && !isRulesOpen" :section="solveSection" :isDropDown="false" />
  <p class="github_text" @click="githubRD" v-if="!isWorksOpen && !isRulesOpen">
    See code for the project on <span>github</span>
  </p>
</div>
</template>

<script src="./Actions.js"></script>

<style src="./Actions.scss" lang="scss"></style>
