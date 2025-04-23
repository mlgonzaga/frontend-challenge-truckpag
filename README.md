🎯 **Objetivo do Desafio**
--------------------------

Avaliar sua habilidade de desenvolver uma aplicação com **React**, utilizando **JavaScript** (ou **TypeScript**, se desejar), consumindo uma **API pública real** e aplicando boas práticas de estruturação de componentes, manipulação de estado e interações com o usuário.

* * *

📜 **Descrição**
----------------

Você deverá desenvolver uma aplicação que consome a API pública do [Studio Ghibli](https://ghibliapi.vercel.app/#tag/Films) e exibe uma lista de filmes do estúdio.

A interface deve permitir ao usuário:

*   Visualizar uma galeria com os filmes.
    
*   Marcar/desmarcar filmes como **“Favorito”**.
    
*   Marcar/desmarcar filmes como **“Assistido”**.
    
*   Visualizar informações completas do filme: título, ano, duração, sinopse, diretor, produtor e pontuação (campo `rt_score`).
    
*   Filtrar os filmes pelo título.
    

A marcação de filmes como assistido/favorito deve ser armazenada no **estado local da aplicação** (não é necessário persistir em backend ou localStorage, mas pode, se quiser mostrar domínio).

* * *

✅ **Requisitos Obrigatórios**
-----------------------------

*   Utilizar **React** com **JavaScript**.
    
*   Consumir a API de filmes do Studio Ghibli.
    
*   Mostrar para cada filme:
    
    *   Imagem do filme.
        
    *   Título.
        
    *   Ano de lançamento.
        
    *   Duração.
        
    *   Sinopse.
        
    *   Diretor e produtor.
        
    *   Nota de avaliação (campo `rt_score`).
        
*   Permitir:
    
    *   Marcar o filme como **assistido**.
        
    *   Marcar o filme como **favorito**.
        
    *   Filtrar os filmes por título através de um campo de texto.
        
    *   Adicionar anotações de texto a um filme.
        
    *   Filtrar os filmes por **assistido, favorito** e **com anotação.**
        
*   Interface agradável e legível (não precisa ser um design incrível, mas bem organizada).
    
*   Componentização e uso de **hooks (useState, useEffect, etc.)**.
    

* * *

💡 **Requisitos Desejáveis**
----------------------------

*   Utilizar **TypeScript**.
    
*   Responsividade básica.
    
*   Escrever pelo menos 1 **teste unitário** (ex: botão de favorito ou função de marcação).
    
*   Separação clara de responsabilidades (componentes, serviços de API, etc).
    
*   Utilizar biblioteca de estilo (Styled-components, Tailwind, Shadcn-ui, etc).
    
*   Utilizar Context API ou uma solução de estado global (Redux, zustand, etc.).
    
*   Utilizar solução para gerenciar estado assíncrono (axios, tanstack query, etc.).
    

💻 Sugestão de interface
------------------------

### Listagem de filmes

<img id="9c2f242c-95b8-440a-97a0-09cf7f106d9a" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-56af3159-f9d9-4ba2-8c11-ab8cbce1eec6.png" width="100%" height="auto">

### Listagem de filmes filtrados

*   Filtros selecionados:
    
    <img id="53e66721-d1aa-42a1-849b-5684f33d948f" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-f9ad1013-c805-4f9a-a55f-05cf4b46a820.png" width="100%" height="auto">
    
*   Sem resultados:
    
    <img id="191004b4-4483-47bd-942f-4e276d540a20" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-c82ad694-6057-4547-8686-2f569c69ea14.png" width="100%" height="auto">
    

### Card com as informações do filme

*   Marcado como assistido e favorito:
    

<img id="27d52108-e594-427c-9547-dd65083314fc" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-324c290f-934e-4ce2-9fc8-4ee961b00314.png" width="392px" height="auto">

*   Com nota adicionada pelo usuário:
    
    <img id="2de1a1aa-e1f8-488c-bdfe-28f8d0ad5f9e" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-8319b460-7be7-412b-8f36-86755eb68bf6.png" width="392px" height="auto">
    

### Modal para adicionar anotações ao filme

<img id="92bb2a51-2b1f-4fa7-95e8-c65e296c21e0" src="https://cdn.coodesh.com/library/6320e7793eac000012b799c5/question/67d979a3d5dab85d5bf92126-fa9b2f9b-20d7-4bf0-a89a-7acffca72518.png" width="520px" height="auto">

* * *

📦 **Entrega**
--------------

1.  Inclua um `README.md` com:
    
    *   Instruções de instalação e execução.
        
    *   Ferramentas utilizadas.
        
    *   Quais requisitos foram implementados.
        
    *   Se aplicável, como rodar os testes.
        

* * *

* * *

💡 **Nota**: O foco está na organização, clareza e qualidade do código — não necessariamente na completude ou complexidade. Explique suas decisões, use commits claros, e divirta-se com o desafio!
