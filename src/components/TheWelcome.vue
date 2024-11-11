<script setup>
import { onMounted } from 'vue';
import { AkEdit, AnOutlinedDelete } from '@kalimahapps/vue-icons';
import Swal from 'sweetalert2'
import { useDataStore } from '@/stores/data';

const store = useDataStore()

function deletethis(id) {
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
      store.deleteData(id);
      setTimeout(() => {
        store.lodeallData() 
      }, 800);
     

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

onMounted(() => {
  store.lodeallData()
})






</script>


<template>
  <div class="border w-full text-center">

    <div class=" p-4">
      <router-link to="/uplode">
        <button class="btn btn-outline btn-secondary">Uplode New Post</button>
      </router-link>
    </div>
    <!-- card -->

    <div class=" border grid grid-cols-1 lg:grid-cols-4  gap-1 md:gap-3">

      <div class="p-2 md:p-5" v-for="(item, index) in store.all" :key="index">


        <div class="card bg-stone-400 text-black w-96">
          <div class="card-body ">
            <div class="flex flex-col items-start space-y-3">
              <h2 class="text-xl"> Name: {{ item.name }}</h2>
             
              <h3 class="text"> namber : {{ item.img }}</h3>
              <p>ID: {{ item.id }}</p>
              <p class="text-lg">This is card item</p>
            </div>

            <div class="pt-5 flex items-center justify-between">
              <button class="btn">View Now</button>
              <div class="text-4xl flex gap-2">

                <!--  router -->
                <router-link :to="{ name: 'EditFile', params: { id: item.id } }">
                  <div class="tooltip" data-tip="Edit">
                    <AkEdit />
                  </div>
                </router-link>
                <!-- router added for new page  -->

                <div class="tooltip" data-tip="Delete" v-on:click="deletethis(item.id)">
                  <AnOutlinedDelete />
                </div>

              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped></style>