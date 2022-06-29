<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import Item from './Item.vue';

const api = axios.create({
  baseURL: 'https://todo-list-32a08-default-rtdb.firebaseio.com/'
});

defineProps({
  msg: {
    type: String,
    required: true
  }
})

let novoItem = ref('');
let lista = ref([]);

const AddItem = () => {
  if (novoItem.value != '') {
    //Monta o objeto e adiciona o novo item no array
    lista.value.push({
      id: lista.value.length + 1,
      nome: novoItem.value,
      marcado: false
    });

    // Salva no Firebase
    api.put('data.json', lista.value);

    novoItem.value = '';
  }
}

onMounted(() => {
  // Carrega dados do Firebase
  api.get('data.json').then(resp => {
    const data = resp.data;
    if (data) {
      lista.value = data;
    }
  })
})


</script>

<template>
  <div class="body d-flex justify-content-center align-items-center w-100 vh-100">
    <div class="overflow-auto py-2 px-5 w-50 h-75 bg-white shadow-lg rounded-1">
      <div class="div-titulo">
        <h1 class="display-1 mb-5 text-center text-uppercase fw-bold">{{ msg }}</h1>
      </div>
      <div class="row mb-5">
        <div class="col-xs-12 col-md-10">
          <InputText type="text" @keyup.enter="AddItem()" v-model.trim="novoItem"
            class="p-inputtext-lg input me-2 w-100" style="height: 60px;"
            placeholder="Insira um item e pressione enter para confirmar" />
        </div>
        <div class="col-xs-12 col-md-2"><Button @click="AddItem()" icon="pi pi-check" style="height: 60px; width: 60px;"
            class="p-button-raised p-button-secondary" />
        </div>

      </div>
      <div class="div-lista">
        <Item :itens="lista"></Item>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  background: #8e9eab;
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);
  background: linear-gradient(to right, #eef2f3, #8e9eab);
}
</style>
