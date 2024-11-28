<script setup lang="ts">
import { apiurl } from '~/env';
import { opencreating } from '../sharedRefs.ts';


let posterImage: Ref<{ file: File, fileUrl: string } | null> = ref(null)



async function share() {

    let body = {
        title:document.querySelector('#nameinput')?.value,
        datetime:(document.querySelector('#dateinput')! as HTMLInputElement).value,
        location:document.querySelector('#locationinput')?.value,
        text:document.querySelector('#noteinput')?.value,
        contact:document.querySelector('#contactinput')?.value,
        posterImage: await posterImage.value?.file.text()
    }


    await fetch(`${apiurl}/parties`, {
        method: 'post',
        body: JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        }
    });

    opencreating.value = false
}

onMounted(() => {
    document.querySelector('#uploadposterbutton')!.addEventListener('click', function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png, image/jpeg'

        input.onchange = e => {
            var file: File = e!.target!.files![0];
            window.file = file
            let fileUrl = URL.createObjectURL(file)
            console.log(fileUrl)
            posterImage.value = { file, fileUrl };

            let img = document.querySelector('#posterpreview img')! as HTMLImageElement
            img.src = fileUrl
            //     var reader = new FileReader();
            // reader.onloadend = function() {
            //      img.src = reader.result;
            // }
            // reader.readAsDataURL(file);
        }

        input.click();

        //   if (this.files && this.files[0]) {
        //       var img = document.querySelector('img');
        //       img.onload = () => {
        //           URL.revokeObjectURL(img.src);  // no longer needed, free memory
        //       }

        //       img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        //   }
    });

    window.document.addEventListener('pointerdown',(e)=>{
    let inForm = document.querySelector('.form')?.contains(e.target)
    if(!inForm) {
        opencreating.value = false;
    }
})
})
</script>
<template>
    <div class="form">

        <div class="title">
            <span>Create a Party Post</span>
        </div>
        <div class="formbody">
            <div class="question">
                <div class="label">Name</div>
                <div class="answer">
                    <input id="nameinput">
                </div>
            </div>

            <div class="question">
                <div class="label">Date & Time</div>
                <div class="answer">
                    <input id="dateinput" type="datetime-local">
                </div>
            </div>

            <div class="question">
                <div class="label">Location</div>
                <div class="answer">
                    <input id="locationinput">
                </div>
            </div>

            <div class="question">
                <div class="label">Extra Note</div>
                <div class="answer">
                    <textarea class="note" id="noteinput" />
                </div>
            </div>

            <div class="question">
                <div class="label">Contact?</div>
                <div class="answer">
                    <input class="note" id="contactinput" />
                </div>
            </div>

            <div class="posterandimage">
                <button id="uploadposterbutton">Upload a poster picture</button>
                <div id="posterpreview">
                    <img id="posterpreviewimg" :src="posterImage?.fileUrl" v-if="posterImage"></img>
                </div>
            </div>

    
            <br>
            <div class="endbuttons">
                <button id="uploadposterbutton" @click="share">Share</button>
            </div>
        </div>
    </div>
</template>
<style src="./createpartyform.css" />
