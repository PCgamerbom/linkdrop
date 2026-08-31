# LinkDrop 🎬

Um conversor moderno e profissional de mídia que permite baixar vídeos em MP4, MP3 e WAV de forma segura e fácil.

## 🌟 Características

- ✅ Interface escura e responsiva
- ✅ Suporte a múltiplos formatos (MP4, MP3, WAV)
- ✅ Seleção de qualidade (360p, 720p, 1080p / 128kbps, 320kbps)
- ✅ Validação de links em tempo real
- ✅ Barra de progresso animada
- ✅ Menu completo com páginas informativas
- ✅ Política de Privacidade e Termos de Uso
- ✅ Sem necessidade de login
- ✅ Totalmente gratuito

## ⚠️ Aviso Importante

LinkDrop deve ser utilizado **APENAS** para:
- Vídeos de sua propriedade
- Conteúdo em domínio público
- Conteúdo com permissão explícita do detentor dos direitos autorais

O uso para download de conteúdo protegido por direitos autorais sem permissão é **proibido** e pode violar leis aplicáveis.

## 🚀 Instalação Local

### Pré-requisitos

- Node.js v14 ou superior
- npm ou yarn
- Backend de processamento de mídia (yt-dlp ou similar)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/PCgamerbom/linkdrop.git
cd linkdrop
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
nano .env  # Edite conforme necessário
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
linkdrop/
├── public/
│   ├── index.html          # Página principal
│   ├── privacy.html        # Política de Privacidade
│   ├── terms.html          # Termos de Uso
│   ├── style.css           # Estilos globais
│   └── script.js           # Lógica do frontend
├── server.js               # Backend Express
├── package.json            # Dependências do projeto
├── .env.example            # Exemplo de variáveis
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

## 🔧 Configuração do Backend

LinkDrop requer um backend de processamento de mídia. Você tem várias opções:

### Opção 1: yt-dlp Standalone (Recomendado para desenvolvimento)

```bash
# Instale yt-dlp
pip install yt-dlp

# Inicie um servidor simples (crie um script chamado media-server.py)
python media-server.py
```

### Opção 2: Docker com yt-dlp

```bash
docker run -d -p 8081:8081 jauderho/yt-dlp
```

### Opção 3: Seu Próprio Servidor

Você pode criar um servidor personalizado em Node.js, Python ou qualquer linguagem que processe mídia.

## 📦 Deploy

### Deploy no Cloudflare Pages

**Importante:** Cloudflare Pages hospeda apenas o **frontend**. Para o backend, você precisa usar:

1. **Cloudflare Workers** (para lógica simples)
2. **Outro serviço** (Heroku, Railway, Render, VPS, etc.)

#### Passos para Deploy no Cloudflare Pages

1. Faça push do código para GitHub
2. Vá para [Cloudflare Pages](https://pages.cloudflare.com)
3. Conecte seu repositório
4. Configure:
   - **Framework preset:** Nenhum (Static site)
   - **Build command:** `npm run build` (ou deixe vazio)
   - **Build output directory:** `public`
5. Clique em "Save and Deploy"

#### Deploy do Backend

Para o backend, você pode usar:

**Heroku:**
```bash
heroku create seu-app-linkdrop
git push heroku main
```

**Railway:**
1. Conecte seu GitHub em [railway.app](https://railway.app)
2. Escolha este repositório
3. Defina `PORT` como variável

**VPS (Digital Ocean, AWS, etc):**
```bash
ssh user@seu-servidor.com
git clone https://github.com/PCgamerbom/linkdrop.git
cd linkdrop
npm install
npm start
```

### Variáveis de Ambiente para Produção

No Cloudflare Pages, adicione:
```
REACT_APP_API_URL=https://seu-backend.com
```

No Cloudflare Workers ou outro backend, configure:
```
CORS_ORIGIN=https://seu-dominio.com
NODE_ENV=production
```

## 🔐 Segurança

- ✅ Nenhuma API key no frontend
- ✅ Validação de URL no backend
- ✅ CORS configurado
- ✅ Limite de requisições (implementar com rate-limiting)
- ✅ Logs de requisições

## 📝 Páginas

### Home (`index.html`)
- Hero com título principal
- Campo para colar URL
- Seletores de formato e qualidade
- Botão "Verificar link"
- Card com informações do vídeo
- Menu de navegação

### Privacidade (`privacy.html`)
- Política de privacidade completa
- Informações sobre dados coletados

### Termos (`terms.html`)
- Termos de uso e condições
- Disclaimer sobre direitos autorais

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📄 Licença

MIT - Veja LICENSE para detalhes

## 👨‍💻 Autor

Desenvolvido com ❤️ por [PCgamerbom](https://github.com/PCgamerbom)

## 📞 Suporte

Tem dúvidas? Abra uma issue no [GitHub](https://github.com/PCgamerbom/linkdrop/issues)

---

**Lembre-se:** Use LinkDrop responsavelmente! Respeite os direitos autorais! 🎬
