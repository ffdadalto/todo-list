<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
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

const qtdItens = computed(() => {
  return lista.value.length;
})
const qtdItensMarcados = computed(() => {
  return lista.value.filter(i => i.marcado).length;
})

const valorBarraProgresso = computed(() => {
  return qtdItensMarcados.value > 0 ? ((qtdItensMarcados.value / qtdItens.value) * 100).toFixed(2) : 0;
})

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
        <template v-if="qtdItens > 0">
          <Item :itens="lista"></Item>
          <div class="mt-3">
            <p v-if="qtdItensMarcados > 1" class="fst-italic m-0 text-center">{{ qtdItensMarcados }} tarefas realizadas
              de
              {{ qtdItens }} tarefas cadastradas...</p>
            <p v-else-if="qtdItensMarcados == 1" class="fst-italic m-0 text-center">1 tarefa realizada de {{ qtdItens }}
              tarefas cadastradas...</p>
            <p v-else class="fst-italic m-0 text-center">Nenhuma tarefa realizada de {{ qtdItens }} tarefas
              cadastradas...
            </p>
            <ProgressBar :value="valorBarraProgresso" />
          </div>
        </template>
        <div v-else class="aviso">
          <p class="fs-1 text-center m-5" style="--bs-text-opacity: .5;">Sem nada pra fazer por aqui...</p>
          <p class="fs-1 text-center m-5">Pode tirar um cochilo =)</p>
          <p class="text-center m-5">
            <i class="pi pi-thumbs-up" style="font-size: 20rem"></i>
          </p>
        </div>
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

.div-titulo {
  color: #626d76;
}

.completo {
  background-color: green !important;
  ;
}

.incompleto {
  background-color: orange !important;
  ;
}
.aviso{
  color: #9b9b9b;
  opacity: 0.3;
}
</style>
