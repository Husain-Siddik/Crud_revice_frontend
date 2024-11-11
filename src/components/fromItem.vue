<template>
  <div>
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">uplode new data!</h1>
          <p class="py-6">
            Practiceng new project to craud oparetion
          </p>
        </div>

        <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">


          <form @submit.prevent="fromdata(event)" class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">name</span>
              </label>
              <input v-model="store.name" name="name" type="text" placeholder="name" class="input input-bordered"
                required />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Namber</span>
              </label>
              <input v-model="store.description" name="description" type="number" placeholder="namber"
                class="input input-bordered" required />

            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary" type="submit">Done</button>
            </div>
          </form>


        </div>
      </div>
    </div>
  </div>
  <!-- img uplode section -->
 

</template>

<script setup>

import { useDataStore } from '../stores/data'
import { useRouter } from 'vue-router';
const router = useRouter()

const store = useDataStore()


function fromdata() {
  //console.log(store.name,store.description);
  const name = store.name;
  const img = store.description;
  const newData = { name, img }
  fetch('http://127.0.0.1:8000/api/v1/post',
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData)
    }
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      router.push('/about')
      

    })

}




//store.imgfileuplode(img)




</script>
