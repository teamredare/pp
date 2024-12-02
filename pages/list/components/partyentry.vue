<script setup lang="ts">
// import type { Post } from "@prisma/client/index-browser";
import { defineProps, ref } from "vue";
defineProps<{
  title: string;
  datetime: number;
  addy: string;
  poster: string;
  posterUserImgUrl: string;
  posterImgUrl: string;
  likes: number;
  dislikes: number;
  attending: number;
  // data:Post,
}>();

const months = 'jan,feb,march,april,may,june,july,aug,sep,oct,nov,dec'.split(',')
const days = 'sunday,monday,tuesday,wednesday,thurs,friday,saturday'.split(',')
</script>

<template>
  <!-- make background be image -->
  <div :class="`entry ` + (posterImgUrl ? 'withimg' : '')" :style="{backgroundImage:posterImgUrl ? `url(${posterImgUrl})` : null}">
    <div class="top">
      <!-- name date time poster etc -->
      <div class="info">
        <div class="nameandposter">
          <div class="partyname">
            {{ title }}
          </div>
          <span class="poster">
            by {{ authorId }}
          </span>
        </div>


        <div class="deets">
          <div class="deet location">
            {{ addy }}
          </div>
          <div class="deet time">
            {{ `
            ${((new Date(datetime)).getHours()+1)%12 -1}${(new Date(datetime)).getHours()<12 ? 'am':'pm'}
            ` }}
          </div>
          <div class="deet date">
            {{
              `
            ${days[(new Date(datetime)).getDay()]}
            ${months[new Date(datetime).getMonth()]}
            ${(new Date(datetime)).getDate()}`
            }}
          </div>
     
        </div>
      </div>
    </div>
    <div class="bottom">
      <!-- attending like dislike -->
      <div class="buttonbar">
        <div class="button attend">
          <img src="assets/check.svg" />
        </div>
        <div class="button like">
          <img src="assets/arrow.svg" />
        </div>
        <div class="button dislike">
          <img src="assets/arrow.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./partyentry.css"></style>
<!-- <style src="./partyentry2.css"></style> -->

<script lang="ts">

</script>