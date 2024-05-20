<template>
    <section>
        <h2 class="mostar-receita-titulo">Receitas</h2>
        
        <div class="mostrar-receita-textos">
            <span class="mostar-receita-resultados">Resultados encontrados: {{ qtdReceitas }}</span>
            
        </div>
        
        <div v-if="receitas.length">
            <span class="mostar-receita-resultados">Veja as opções de receitas que encontramos com os ingredientes que você tem por aí!</span>
            <ul class="mostrar-receita-container">
                <li v-for="receita in receitas" :key="receita.nome">
                    <CardReceita :receita="receita" />
                </li> 
            </ul>
        </div>
        
        <div v-else class="receitas-nao-encontradas">
            <p class="paragrafo-lg receitas-nao-encontradas__info">
                Ops, não encontramos resultados para sua combinação. Vamos tentar de novo?
            </p>
            
            <img src="../assets/imagens/sem-receitas.png"
            alt="Desenho de um ovo quebrado. A gema tem um rosto com uma expressão triste.">
        </div>
        
        
        <BotaoPrincipal class="mostar-receita-botao" :texto="'Editar Lista'"  @click="$emit('editarReceitas')" />
        
    </section>
    
</template>

<script lang="ts">
import CardReceita from "./CardReceita.vue";
import { obterReceitas } from "@/http";
import type IReceita from "@/interfaces/IReceita";
import BotaoPrincipal from "./BotaoPrincipal.vue";
import type { PropType } from "vue";
import { itensDeListaEstaoEmOutraLista } from "@/operacoes/listas";

export default {
    props : {
        ingredientes : {type: Array as PropType<string[]>, required: true}
    },
    components: {CardReceita, BotaoPrincipal},
    emits: ['editarReceitas'],
    data() {
        return {
            receitas : [] as IReceita[],
            qtdReceitas: 0 as number
        }
    },
    async created() { 
        const receitasEmcontrdads = await obterReceitas();
        this.receitas = receitasEmcontrdads.filter((receita) => {
           
            const possoFazerReceita = itensDeListaEstaoEmOutraLista(receita.ingredientes, this.ingredientes)
            console.log(possoFazerReceita)

            return possoFazerReceita
        })
        this.qtdReceitas = this.receitas.length
    }
}


</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.mostar-receita-titulo {
    font-family: Paytone One;
    font-size: 44px;
    font-weight: 400;
    line-height: 52.8px;
    text-align: center;
    color: #3D6D4A;
}
.mostrar-receita-textos {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
}
.mostar-receita-resultados {
    font-family: Nunito Sans;
    font-size: 22px;
    font-weight: 400;
    line-height: 33px;
    text-align: center;
}

.mostrar-receita-container {
    display: grid;
    grid-template-columns: auto auto auto auto;
    row-gap: 2em;
    column-gap: 2em;
}

.mostar-receita-botao {
    margin-top: 2em;
}

.receitas-nao-encontradas {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 300px;
        height: 300px;
    }
}


@media only screen and (max-width: 900px) {
    .mostrar-receita-container {
        display: grid;
        grid-template-columns: auto auto;
        row-gap: 2em;
        column-gap: 2em;
    }
}


@media only screen and (max-width: 650px) {
    .mostrar-receita-container {
        display: grid;
        grid-template-columns: auto;
        row-gap: 2em;
        column-gap: 2em;
    }
}
</style>