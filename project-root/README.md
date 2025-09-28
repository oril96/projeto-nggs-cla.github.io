# Projeto Landing - StreamNow NGGS

Pequena landing page de exemplo para um serviço de streaming, construída com Flask.

Visão geral
- Servidor: Flask simples que serve um template `index.html`.
- Frontend: HTML/CSS para página de apresentação; carrossel de títulos e cards de planos.

Estrutura do repositório

```
project-root/
  app.py                # App Flask
  requirements.txt      # Dependências Python
  static/
    css/style.css
    js/main.js
    img/                # Imagens usadas na landing
  templates/
    index.html
  README.md
```

Como rodar localmente (Linux/macOS)

1. Crie e ative um virtualenv Python 3:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Instale dependências:

```bash
pip install -r requirements.txt
```

3. Execute a aplicação Flask:

```bash
export FLASK_APP=app.py
export FLASK_ENV=development
flask run
```

Abra http://127.0.0.1:5000 no seu navegador.

Notas importantes
- O arquivo `templates/index.html` atualmente contém trechos de HTML fora das tags `</body>`/`</html>` e um script inline incompleto; é recomendado corrigir a estrutura antes de produção.
- `static/js/main.js` existe mas está vazio; mover o JS inline para esse arquivo melhora organização.

Como manter este README atualizado
- Sempre que adicionarmos ou modificarmos funcionalidade, adicione um trecho curto no final do README sob "Changelog" descrevendo a mudança.
- Use commits atômicos com mensagens claras para facilitar a documentação das mudanças.

API e fonte de dados
- Rota JSON: `/api/titles` — retorna uma lista de objetos {"title": "...", "img": "filename.jpg"} com os títulos atualmente exibidos.
- Uso: a interface cliente (`static/js/main.js`) tenta buscar essa rota automaticamente; se disponível, os slides são reconstruídos a partir do JSON.

Controles do carrossel
- Prev/Next: botões visíveis ao lado do carrossel (◀ / ▶) permitem avançar/retroceder. Eles pausam a reprodução automática ao ser acionados.
- Indicadores: um botão por título (abaixo do carrossel) permite ir diretamente a um título.
- Navegação por teclado: suporta ArrowLeft / ArrowRight (navegação), Home / End (início/fim).

Acessibilidade (a11y)
- O carrossel é marcado com `role="region"` e `aria-label` para descrever seu conteúdo.
- O `carousel-track` tem `aria-live="polite"` para anunciar mudanças relevantes a leitores de tela.
- Os indicadores usam `role="tab"` e o estado `aria-selected`.
- Recomenda-se revisar e adicionar descrições mais ricas (`aria-label` nas imagens ou `aria-describedby`) se os títulos precisarem de contexto adicional.

Como atualizar os títulos (conteúdo)
- Método 1 (rápido): editar `app.py` na função `get_titles()` e reiniciar o servidor. Adicione objetos com `title` e `img` (arquivo deve existir em `static/img/`).
- Método 2 (dinâmico): implementar uma fonte externa ou painel de edição que atualize a rota `/api/titles` — o frontend reconstrói os slides automaticamente quando a API está disponível.

Manutenção do README
- Ao alterar a API, o comportamento do carrossel ou a estrutura de arquivos, adicione uma entrada no `Changelog` com data e breve descrição.
- Para mudanças de design, inclua um pequeno screenshot ou GIF no diretório `docs/` e referencie no README.

Changelog
- 2025-09-28: README inicial criado.
- 2025-09-28: Corrigido `templates/index.html` (estrutura inválida removida) e movido script do carrossel para `static/js/main.js` (animação automática com pausa on-hover).
- 2025-09-28: Tornado o layout responsivo — atualizados `static/css/style.css` (media queries) e `static/js/main.js` (recalcula larguras e suporte básico a touch).
- 2025-09-28: Carrossel gerado dinamicamente via Jinja2 — `app.py` fornece lista `titles` e `templates/index.html` itera sobre ela.
- 2025-09-28: Adicionados controles do carrossel (prev/next e indicadores), melhorias de acessibilidade (atributos ARIA e suporte a teclado) e rota `/api/titles` para fonte de dados JSON.

