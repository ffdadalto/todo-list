<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-list-32a08-default-rtdb.firebaseio.com/'
});


defineProps({
    itens: {
        type: Array,
        required: true
    }
})

const marcarItem = (item, itens) => {
    item.marcado = !item.marcado;



    // Envia pro banco de dados
    api.put('data.json', itens);

    // novoItem.value = '';
    // }
}

const excluirItem = (obj, itens) => {

    // Localiza o indice do objeto
    let i = itens.indexOf(obj);

    // Remove o objeto da lista pelo indice encontrado acima
    if (i => 0 && i < itens.lenght)
        itens.splice(i, 1);

    // Salva no Firebase
    api.put('data.json', itens);
}
</script>

<template>
    <div v-for="item in itens" class="item d-flex justify-content-between align-items-center px-5 py-2 mb-2 rounded-1">
        <div :class="item.marcado ? 'marcado' : ''" class="item-descricao m-0 text-start fs-2 text-wrap"
            @click="marcarItem(item, itens)">{{ item.nome }}</div>
        <div>
            <i class="fas fa-trash fs-3 icone-trash" @click="excluirItem(item, itens)"></i>
        </div>
    </div>
</template>

<style scoped>
.icone-trash {
    color: #ff6161;
    cursor: pointer;
}

.icone-trash:hover {
    color: #b40000;
}

.item {
    border: 1px solid #f3f3f3;
}

.item {
    background-color: #f0f0f0;
}

.item:hover {
    background-color: #e0e0e0;
}

.item-descricao {
    color: #7a7a7a;
    cursor: pointer;
}

.marcado {
    text-decoration: line-through;
    opacity: 50%;
}
</style>