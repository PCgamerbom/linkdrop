const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LinkDrop is running!' });
});

// Rota para informações do vídeo
app.post('/api/video-info', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    // Validar URL
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ error: 'URL inválida' });
    }

    // Chamar backend de mídia
    const mediaServerUrl = process.env.MEDIA_SERVER_URL || 'http://localhost:8081';
    
    res.json({
      success: true,
      message: 'Conecte seu backend de mídia aqui',
      info: {
        title: 'Título do Vídeo',
        duration: '10:30',
        thumbnail: 'https://via.placeholder.com/320x180'
      }
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao processar vídeo' });
  }
});

// Rota para download
app.post('/api/download', async (req, res) => {
  try {
    const { url, format, quality } = req.body;
    
    if (!url || !format || !quality) {
      return res.status(400).json({ error: 'URL, formato e qualidade são obrigatórios' });
    }

    res.json({
      success: true,
      message: 'Download iniciado',
      downloadUrl: '/downloads/video.mp4'
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao fazer download' });
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 LinkDrop rodando em http://localhost:${PORT}`);
  console.log(`📡 Backend de mídia esperado em: ${process.env.MEDIA_SERVER_URL || 'http://localhost:8081'}`);
});
