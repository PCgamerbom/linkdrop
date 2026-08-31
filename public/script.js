// API Base URL
const API_BASE = window.location.origin + '/api';

// DOM Elements
const urlInput = document.getElementById('url');
const verifyBtn = document.getElementById('verifyBtn');
const videoInfo = document.getElementById('videoInfo');
const options = document.getElementById('options');
const downloadBtn = document.getElementById('downloadBtn');
const progress = document.getElementById('progress');
const progressBar = document.querySelector('.progress-bar');
const progressText = document.getElementById('progressText');
const messageDiv = document.getElementById('message');
const formatSelect = document.getElementById('format');
const qualitySelect = document.getElementById('quality');

// Event Listeners
verifyBtn.addEventListener('click', verifyLink);
downloadBtn.addEventListener('click', startDownload);

// Funções
async function verifyLink() {
    const url = urlInput.value.trim();

    if (!url) {
        showMessage('Por favor, digite uma URL válida', 'error');
        return;
    }

    try {
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Verificando...';
        showMessage('Verificando link...', 'info');

        const response = await fetch(`${API_BASE}/video-info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error('Link inválido ou indisponível');
        }

        const data = await response.json();

        if (data.success) {
            // Mostrar informações do vídeo
            document.getElementById('thumbnail').src = data.info.thumbnail;
            document.getElementById('videoTitle').textContent = data.info.title;
            document.getElementById('videoDuration').textContent = `Duração: ${data.info.duration}`;
            
            videoInfo.style.display = 'flex';
            options.style.display = 'grid';
            options.style.gridTemplateColumns = '1fr 1fr auto';
            options.style.gap = '1rem';
            options.style.alignItems = 'end';
            
            showMessage('Link verificado com sucesso! ✅', 'success');
        } else {
            showMessage('Erro ao verificar link', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage(error.message || 'Erro ao verificar link', 'error');
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = 'Verificar Link';
    }
}

async function startDownload() {
    const url = urlInput.value.trim();
    const format = formatSelect.value;
    const quality = qualitySelect.value;

    if (!url || !format || !quality) {
        showMessage('Preencha todos os campos', 'error');
        return;
    }

    try {
        downloadBtn.disabled = true;
        downloadBtn.textContent = 'Baixando...';
        progress.style.display = 'block';
        showMessage('Iniciando download...', 'info');

        const response = await fetch(`${API_BASE}/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, format, quality })
        });

        if (!response.ok) {
            throw new Error('Erro ao iniciar download');
        }

        const data = await response.json();

        if (data.success) {
            // Simular progresso
            animateProgress();

            // Após progresso, redirecionar para download
            setTimeout(() => {
                window.location.href = data.downloadUrl;
                showMessage('Download concluído! ✅', 'success');
                progress.style.display = 'none';
                downloadBtn.disabled = false;
                downloadBtn.textContent = '⬇️ Baixar Agora';
            }, 3000);
        } else {
            showMessage('Erro ao processar download', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage(error.message || 'Erro ao baixar', 'error');
        downloadBtn.disabled = false;
        downloadBtn.textContent = '⬇️ Baixar Agora';
        progress.style.display = 'none';
    }
}

function animateProgress() {
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 95) {
            clearInterval(interval);
            return;
        }
        width += Math.random() * 20;
        progressBar.style.width = width + '%';
        progressText.textContent = Math.floor(width) + '%';
    }, 500);
}

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + type;
    messageDiv.style.display = 'block';

    if (type !== 'info') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
}

// Atualizar qualidades baseado no formato
formatSelect.addEventListener('change', function() {
    const format = this.value;
    qualitySelect.innerHTML = '';

    if (format === 'mp4') {
        qualitySelect.innerHTML = `
            <option value="360p">360p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
        `;
    } else {
        qualitySelect.innerHTML = `
            <option value="128kbps">128kbps</option>
            <option value="256kbps">256kbps</option>
            <option value="320kbps">320kbps</option>
        `;
    }
});

// Permitir Enter para verificar link
urlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verifyLink();
    }
});

console.log('🎬 LinkDrop carregado com sucesso!');
