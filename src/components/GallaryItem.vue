<script setup>
import { useDataStore } from '../stores/data';
import { ref } from 'vue';
import { AkEdit, AnOutlinedDelete } from '@kalimahapps/vue-icons';
import { onMounted } from 'vue';
import imgUplode from './imgUplode.vue';
import Swal from 'sweetalert2'
const store = useDataStore()

const isVisible = ref(false)

onMounted(() => {
    store.ShowallImg()

})

function handelDelete(id) {
    // console.log(`delete koroaita ${id}`);
    // store.deleteimg(id)
    // //  then relode


    // setTimeout(() => {
    //     store.ShowallImg()
    // }, 1000);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-accent p-4",
            cancelButton: "btn btn-warning p-4"
        },
        buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",


            });
            // do something if actually deletaed
            store.deleteimg(id)

            setTimeout(() => {
                store.ShowallImg()
            }, 700);

        } else if (

            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your  file is safe :)",
                icon: "error"
            });
            //  do something if data is safe


        }
    });






}

//  for component hide or show
function hideShow() {
    isVisible.value = !isVisible.value

}
</script>

<template>
    <div class=" border text-center text-2xl">
        <h1 class="pb-3">All Imges here</h1>
        <div class="p-4">
            <button class="btn btn-success " v-on:click="hideShow()">New Uplode</button>
        </div>
        <div v-if="isVisible">
            <imgUplode></imgUplode>
        </div>
    </div>

    <div class="mt-3 mb-7 grid grid-cols-1 lg:grid-cols-4 gap-4 items-center justify-center">
        <div class="border rounded-3xl ml-5 " v-for="img in store.imgs" :key="img.id">
            <div class="flex items-center justify-center ">
                <div class="ml-3 p-3 card">
                    <div class="avatar border rounded-lg ">
                        <div class="mask mask-squircle w-80 p-1">
                            <img :src='`http://127.0.0.1:8000` + img.url' />

                        </div>

                    </div>

                    <div class="text-4xl border rounded-xl flex w-80  justify-end gap-4">
                        <div class="mr-3">
                            <h1> id :{{ img.id }}</h1>
                        </div>
                        <div>
                            <AkEdit />
                        </div>
                        <div class="" v-on:click="handelDelete(img.id)">
                            <AnOutlinedDelete />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped></style>