<template>
    <section class="card-receita">
       <img :src="`/imagens/receitas/${receita.imagem}`" alt="" srcset=""> 
       <h2> {{ receita.nome }} </h2>
    </section>
       
</template>

<script lang="ts">
import type IReceita from '@/interfaces/IReceita';
import type { PropType } from 'vue';

export default {
    props: {
        receita : {type: Object as PropType<IReceita>, required: true }
    }

}
</script>

<style scoped>
.card-receita {
    width: 312px;
    height: 246px;
    background-color: #fff;
    
    img {
        width: 312px;
        height: 150px;
        border-radius: 16px 16px 0px 0px;
    }

    h2 {
        font-weight: 700;
        line-height: 27px;
        text-align: center;
        margin-top: 25px;
    }
}

</style>