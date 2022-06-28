<script setup>

import { ref, reactive } from 'vue';

defineProps({
  msg: {
    type: String,
    required: true
  }
})

let novoItem = reactive({ id: '', descricao: '' });
const itens = ref([
  { id: 1, descricao: 'Primeiro Item' },
  { id: 2, descricao: 'Segundo Item' },
]);

const AddItem = () => {
  itens.value.push({ id: itens.value.length + 1, descricao: novoItem.descricao });
  novoItem.id = '';
  novoItem.descricao = '';
}


</script>

<template>
  <div class="d-flex justify-content-center align-items-center w-100 vh-100 bg-light">
    <div class="py-2 px-5 w-50 h-75 bg-white shadow-lg rounded-1">
      <div class="div-titulo">
        <h1 class="display-1 mb-5 text-center text-uppercase">To Do List</h1>
      </div>
      <div class="todo mb-5" >
        <InputText type="text" @keyup.enter="AddItem()" v-model.trim="novoItem.descricao" class="p-inputtext-lg input w-100"
          placeholder="Insira um item e pressione enter para confirmar" />
      </div>
      <div class="div-itens">
        <ul>
          <li v-for="(item, i) in itens" :key="item.id">{{ item.descricao }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
