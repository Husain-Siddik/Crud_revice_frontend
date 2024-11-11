import { defineStore } from 'pinia'
import { ref } from 'vue';
import router from '@/router';
export const useDataStore = defineStore('data', {
  state: () => ({
    count: 0,
    name: '',
    description: '',
    all: '',
    Editname: ref(''),
    EditDescrip: ref(''),
    uplodeimgUrl: ref(''),
    appname: 'http://127.0.0.1:8000',
    imgs: null,
    imgurl: ref(''),



  }),
  getters: {

    doubleCount: (state) => state.count * 2,
  },
  actions: {

    increment() {
      this.count++
    },

    EditData(id) {

      const name = this.Editname;
      const img = this.EditDescrip;

      const newData = { name, img };
      console.log(id);


      fetch(`http://127.0.0.1:8000/api/v1/post/${id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData)
        }
      ).then(res => res.json())
        .then(data => {

          //  this.Editname = data?.post?.name
          //  this.EditDescrip = data?.post?.img
          console.log(data);

          router.push('/about')

        })


    },

    lodeallData() {

      fetch('http://127.0.0.1:8000/api/v1/posts')
        .then(res => res.json())
        .then(data => {
          this.all = data.post

          console.log(this.all);

          //console.log(data);

        })
    },

    deleteData(id) {

      fetch(`http://127.0.0.1:8000/api/v1/post/${id}`,
        {
          method: 'DELETE',
          // headers :{
          //  "Content-Type": "application/json",
          // },
          // body:JSON.stringify(deleteid)
        }
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // relode the page
          


        })
    },

    lodesingleData(id) {


      fetch(`http://127.0.0.1:8000/api/v1/posts/${id}`
        // {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(newData)
        // }
      )
        .then(res => res.json())
        .then(data => {

          this.Editname = data?.post?.name
          this.EditDescrip = data?.post?.img



        })


    },

    // img uplode
    imgfileuplode(d) {
      console.log(d);
      fetch('http://127.0.0.1:8000/api/fbimg/uplode', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: d
      })
        .then(res => res.json())
        .then()


    },

    ShowallImg() {
      fetch(`http://127.0.0.1:8000/api/fbimg`)
        .then(res => res.json())
        .then(data => {

          this.imgs = data.images;
          console.log(this.imgs);


        })


    },

    deleteimg(id) {
      fetch(`http://127.0.0.1:8000/api/fbimg/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);

        })
    }


  },
})