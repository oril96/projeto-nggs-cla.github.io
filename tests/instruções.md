
# Instruções de compilação e testes NGGS

Siga o passo a passo abaixo sempre que precisar validar e compilar o projeto após alterações.

## 1. Preparar ambiente Python

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
pip install -e .
```

## 2. Validar qualidade do código

Execute as mesmas checagens usadas no CI para garantir que a branch está saudável:

```bash
ruff check --output-format=github .
black --check .
isort --check-only .
pytest -q
```

Se algum comando apontar problema, corrija antes de prosseguir.

## 3. Compilar o site estático

Gere os arquivos do MkDocs em `site/`:

```bash
mkdocs build --strict
```

O parâmetro `--strict` garante que qualquer erro de lint nos arquivos Markdown interrompa o build.

## 4. Visualizar em desenvolvimento

Para revisar o layout e interações em tempo real:

```bash
mkdocs serve
```

Acesse `http://127.0.0.1:8000` no navegador e pressione `Ctrl+C` para encerrar quando terminar.

## 5. Fluxo sugerido antes do commit

1. Atualize ou gere conteúdo via CLI se necessário (`nggs gen weapon`, `nggs calc edpi`).  
2. Rode os comandos dos passos 2 e 3.  
3. Verifique se nenhum arquivo `.bak` permanece no repositório (eles são ignorados pelo `.gitignore`).  
4. Faça commit apenas após tudo estar verde.

Pronto! O mesmo pipeline é executado automaticamente no GitHub Actions ao abrir um PR ou fazer push na `main`.
