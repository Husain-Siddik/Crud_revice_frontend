<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDataStore } from '@/stores/data';
const store = useDataStore();
const route = useRoute();




// const Id = route.params.id

onMounted(() => {
  const id = route.params.id


  store.lodesingleData(id)
})

 function handleEditData(){
  store.EditData(route.params.id)
  
 }



</script>

<template>
  <div class=" flex items-center justify-center">
    <div class="border w-6/12  rounded-xl bg-[#e1dedc] text-xl">
      <form @submit.prevent="handleEditData()" class="card-body ">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-xl">Name</span>
          </label>
          <input v-model="store.Editname" name="name" type="text" placeholder="name" class="input input-bordered"
            required />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-xl">Namber</span>
          </label>
          <input v-model="store.EditDescrip" name="description" type="number" placeholder="namber"
            class="input input-bordered" required />

        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary text-xl">Done</button>
        </div>

      </form>
    </div>
  </div>
</template>



<style lang="scss" scoped></style>