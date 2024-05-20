export function itensDeListaEstaoEmOutraLista(lista1 : unknown[], lista2 : unknown[]) {
    return lista1.every((itemLista1) => lista2.includes(itemLista1));
}