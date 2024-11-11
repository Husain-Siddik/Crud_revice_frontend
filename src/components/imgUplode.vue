<template>
    <div>
        <div class=" w-full text-center flex  justify-center p-5 ">
            <div class="bg-[#003161] w-1/2  p-5 text-white rounded-md space-y-3">
                <h2> img uplode</h2>
                <form @submit.prevent="uploadFile" class="flex flex-col items-center bg-[#FAF0E6]  text-xl rounded-xl">
                    <input ref="file" @change="handleFileUpload" type="file" class="border w-1/2 m-3 ">
                    <button type="submit" class="btn btn-primary w-1/2 m-2 text-xl ">uplode</button>
                </form>
            </div>
        </div>

        <!-- allart -->
        <div v-if="show" class="toast toast-top toast-center">

            <div class="alert alert-success">
                <span>Imge Uploded successfully.</span>
            </div>
        </div>

        <!-- allert -->

        <!-- uploded img show -->

        <div v-if="store.uplodeimgUrl" class="flex items-center justify-center">
            <div class="ml-3 p-3">
                <div class="avatar  ">
                    <div class="mask mask-squircle w-80">
                        <img :src="store.uplodeimgUrl" />
                    </div>

                </div>

                <div class="text-4xl border flex w-80  justify-end ">

                    <!-- <div>
                        <AkEdit />
                    </div>
                    <div class="pl-3">
                        <AnOutlinedDelete />
                    </div> -->

                </div>

            </div>
            <!--  -->

        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '../stores/data'

const store = useDataStore()

const file = ref(null)
const show = ref(false)


const handleFileUpload = (event) => {
    // Get the selected file
    file.value = event.target.files[0];
};


const uploadFile = async () => {
    if (file.value == '') {
        console.log('Please select a file!');

        return;
    }

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('fbimg', file.value);  // "fbimg is the colam name"

    try {

        const response = await fetch('http://127.0.0.1:8000/api/fbimg/uplode', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const file = await response.json();
            console.log('File uploaded successfully!');
            console.log('http://127.0.0.1:8000' + file.url);
            store.uplodeimgUrl = store.appname + file.url;

            // for showing data
            store.ShowallImg()
            // for hide recently uplode img
            setTimeout(() => {
                store.uplodeimgUrl = ''

            }, 2000);
            //  for showing toaste
            show.value = true
    


        } else {
            console.log('Failed to upload file.');

        }
    } catch (error) {

        console.log('Failed to upload file.');
        console.log(error);



    }

    setTimeout(() => {
        show.value = false
    }, 1000);
    
};




</script>

<style lang="scss" scoped></style>