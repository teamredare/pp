<script setup lang="ts">
import Entry from "./components/partyentry.vue";
import { ref } from "vue";
import { apiurl } from "../../env";
import type { Post } from "@prisma/client/edge";
import Createpartyform from "./components/createpartyform.vue";

let posts = ref<Post[]>([]);
let lockedout = ref(false);

import { opencreating } from "./sharedRefs";
import Lockout from "./components/lockout.vue";

(async () => {
  let res = await fetch(`${apiurl}/parties`);
  let json = await res.json() as Post[];
  if (res.status == 403) {
    lockedout.value = true;
  } else {
    lockedout.value = false;
    posts.value = json

  }

  // posts.value = JSON.parse(`
  // [{"id":1,"title":"hello test","datetime":"2024-11-24T10:07:36.131Z","authorId":242342,"createdAt":"2024-11-24T10:13:18.178Z","location":null,"text":null,"contact":null,"dmForAddy":false,"published":true},{"id":2,"title":"hello test","datetime":"2024-11-24T10:07:36.131Z","authorId":242342,"createdAt":"2024-11-24T10:13:20.132Z","location":null,"text":null,"contact":null,"dmForAddy":false,"published":true},{"id":3,"title":"hello test","datetime":"2024-11-24T10:07:36.131Z","authorId":242342,"createdAt":"2024-11-24T10:13:21.835Z","location":null,"text":null,"contact":null,"dmForAddy":false,"published":true}]
  // `)
})();

function toggleCreate() {
  opencreating.value = !opencreating.value
}
</script>

<template>
  <div class="pageroot">


    <!-- <div class="title">parties</div> -->
    <div></div>
    <div class="itembar">
      <div class="itemnest">
        <span class="agelabel">age range:</span>
        <select class="agerangeselector">
          <option>15-18</option>
          <option>18-21</option>
          <option>21+</option>
        </select>
      </div>
      <button class="post" @click="toggleCreate">+</button>
    </div>
    <Createpartyform class="modal" :style="opencreating ? {
      height: '400px',
      boxShadow: 'rgba(0, 0, 0, 0.637) 2px 2px 600px 600px'
    } : {
      height: '0px',
      paddingTop: 0,
      paddingBottom: 0,
    }"></Createpartyform>

    <div class="list">
      <Lockout v-if="lockedout"/>
      <Entry v-for="post in posts" :title="post.title" :datetime="post.datetime" :addy="post.location"
        :poster="james" :posterImgUrl="post.posterFilename ? `${apiurl}/posterimage/${post.posterFilename}` : null"/>
    </div>
  </div>
</template>
<style src="./style.css" />