# Calculadora NGGS — eDPI e Distância de 360°

Atualize esta página via CLI:

```bash
poetry run nggs calc edpi --dpi 800 --sens 1.2 --saida docs/mouse/calculadora.md
```

> Ajuste o comando conforme suas ferramentas (poetry/pipx). O script substitui apenas a seção **Resultado Atual**.

## Resultado Atual

> Nenhum cálculo gerado ainda. Execute o comando da CLI para preencher automaticamente.

## Como interpretar

- **eDPI (Effective DPI)**  
  - **Descrição:** produto entre DPI físico e sensibilidade do jogo.  
  - **Por que fazer:** padroniza sensibilidade ao comparar com outros títulos.  
  - **Como reverter:** volte aos valores antigos utilizando o backup gerado pela CLI (arquivo `.bak`).  
  - **Impacto esperado:** controle previsível ao alternar entre modos de mira.

- **Distância de 360°**  
  - **Descrição:** quanto o mouse precisa se deslocar para realizar uma volta completa no jogo.  
  - **Por que fazer:** ajuda a calibrar espaço do mousepad e encontrar conforto na mira.  
  - **Como reverter:** recalcule com valores anteriores ou restaure o arquivo `.bak`.  
  - **Impacto esperado:** movimentos mais consistentes, evitando extrapolar o mousepad em engagements rápidos.
