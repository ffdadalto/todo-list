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
  <div class="content">
    <div class="todo">
      <div class="div-titulo">
        <h1 class="display-1">To-Do List</h1>
      </div>
      <div class="div-input">
        <InputText type="text" @keyup.enter="AddItem()" v-model.trim="novoItem.descricao" class="p-inputtext-lg input"
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
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.todo {
  height: 800px;
  width: 600px;
  background-color: #ebebeb;
  border-radius: 5px;
  padding: 20px;
}

h1 {
  text-align: center;
}

.div-titulo {
  margin-bottom: 30px;
}

.div-input {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  width: 100%;
}
</style>
