class DashboardController {
    constructor() {
        this.data = [];
        this.filteredData = null;
        this.lastModified = null;
        this.autoReloadInterval = null;
        this.currentFilters = {
            avaliacao: '',
            anoEscolar: '',
            componente: '',
            rede: '',
            escola: '',
            performance: 'all'
        };
        
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.populateFilters();
        this.showInitialMessage();
        // Iniciar verificação automática de atualizações
        this.startAutoReload();
    }

    showInitialMessage() {
        const container = document.getElementById('cards-container');
        const noDataDiv = document.getElementById('no-data');
        const loadingDiv = document.getElementById('loading');
        
        container.style.display = 'none';
        loadingDiv.style.display = 'none';
        noDataDiv.style.display = 'block';
    }

    async loadData() {
        try {
            const response = await fetch('CICLO_III_2025.yaml', {
                cache: 'no-cache' // Evitar cache do navegador
            });
            
            // Capturar o Last-Modified header para detectar mudanças
            const newLastModified = response.headers.get('Last-Modified') || new Date().toISOString();
            
            const yamlText = await response.text();
            this.data = jsyaml.load(yamlText);
            this.lastModified = newLastModified;
            
            console.log('📄 Dados carregados:', this.data);
            console.log('⏰ Última modificação:', this.lastModified);
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
        }
    }

    setupEventListeners() {
        // Event listeners para os filtros
        document.getElementById('avaliacao').addEventListener('change', (e) => {
            this.currentFilters.avaliacao = e.target.value;
            this.applyFilters();
        });

        document.getElementById('ano-escolar').addEventListener('change', (e) => {
            this.currentFilters.anoEscolar = e.target.value;
            this.applyFilters();
        });

        document.getElementById('componente').addEventListener('change', (e) => {
            this.currentFilters.componente = e.target.value;
            this.applyFilters();
        });

        document.getElementById('rede').addEventListener('change', (e) => {
            this.currentFilters.rede = e.target.value;
            this.applyFilters();
        });

        document.getElementById('escola').addEventListener('change', (e) => {
            this.currentFilters.escola = e.target.value;
            this.renderCards();
        });

        document.getElementById('performance-range').addEventListener('change', (e) => {
            this.currentFilters.performance = e.target.value;
            this.renderCards();
        });

        // Event listener para fechar modal
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Fechar modal com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    populateFilters() {
        const avaliacoes = [...new Set(this.data.map(item => item.filtros.avaliacao))];
        const anos = [...new Set(this.data.map(item => item.filtros.ano_escolar))];
        const componentes = [...new Set(this.data.map(item => item.filtros.componente_curricular))];
        const redes = [...new Set(this.data.map(item => item.filtros.rede))];

        this.populateSelect('avaliacao', avaliacoes);
        this.populateSelect('ano-escolar', anos);
        this.populateSelect('componente', componentes);
        this.populateSelect('rede', redes);
    }

    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    populateEscolasFilter(escolas) {
        const select = document.getElementById('escola');
        // Limpar opções existentes (exceto as primeiras duas)
        while (select.children.length > 2) {
            select.removeChild(select.lastChild);
        }
        
        escolas.forEach(escola => {
            const optionElement = document.createElement('option');
            optionElement.value = escola.escola;
            optionElement.textContent = escola.escola;
            select.appendChild(optionElement);
        });
    }

    applyFilters() {
        // Se nenhum filtro básico estiver selecionado, não mostrar dados
        if (!this.currentFilters.avaliacao || !this.currentFilters.anoEscolar || 
            !this.currentFilters.componente || !this.currentFilters.rede) {
            this.filteredData = null;
            this.populateEscolasFilter([]);
            this.renderCards();
            return;
        }

        this.filteredData = this.data.find(item => {
            const filters = item.filtros;
            return filters.avaliacao === this.currentFilters.avaliacao &&
                   filters.ano_escolar === this.currentFilters.anoEscolar &&
                   filters.componente_curricular === this.currentFilters.componente &&
                   filters.rede === this.currentFilters.rede;
        });

        // Popular o filtro de escolas baseado nos dados filtrados
        if (this.filteredData && this.filteredData.por_escola) {
            this.populateEscolasFilter(this.filteredData.por_escola);
        } else {
            this.populateEscolasFilter([]);
        }

        this.renderCards();
    }

    renderCards() {
        const container = document.getElementById('cards-container');
        const noDataDiv = document.getElementById('no-data');
        const loadingDiv = document.getElementById('loading');
        
        container.innerHTML = '';
        loadingDiv.style.display = 'none';

        if (!this.filteredData || !this.filteredData.habilidades_descritores) {
            container.style.display = 'none';
            noDataDiv.style.display = 'block';
            return;
        }

        container.style.display = 'grid';
        noDataDiv.style.display = 'none';

        const habilidades = this.filteredData.habilidades_descritores;
        
        habilidades.forEach(habilidade => {
            let percentage;
            let isEscolaData = false;
            
            // Determinar se mostrar dados de escola específica ou média geral
            if (this.currentFilters.escola && this.currentFilters.escola !== '' && this.currentFilters.escola !== 'geral') {
                // Buscar dados da escola específica
                const escolaData = this.filteredData.por_escola.find(escola => 
                    escola.escola === this.currentFilters.escola
                );
                if (escolaData && escolaData.habilidades[habilidade.habilidade]) {
                    percentage = parseInt(escolaData.habilidades[habilidade.habilidade].replace('%', ''));
                    isEscolaData = true;
                } else {
                    return; // Pular se não há dados para esta escola
                }
            } else {
                // Usar média geral
                percentage = parseInt(habilidade.media_geral.replace('%', ''));
            }
            
            // Aplicar filtro de performance se selecionado
            if (this.currentFilters.performance !== 'all') {
                const [min, max] = this.getPerformanceRange(this.currentFilters.performance);
                if (percentage < min || percentage > max) {
                    return;
                }
            }

            const card = this.createCard(habilidade, percentage, isEscolaData);
            container.appendChild(card);
        });
    }

    getPerformanceRange(range) {
        const ranges = {
            '0-40': [0, 40],
            '41-60': [41, 60],
            '61-80': [61, 80],
            '81-100': [81, 100]
        };
        return ranges[range] || [0, 100];
    }

    createCard(habilidade, percentage, isEscolaData = false) {
        const card = document.createElement('div');
        card.className = `skill-card ${this.getColorClass(percentage)}`;
        
        const sourceLabel = isEscolaData ? 'Escola' : 'Geral';
        
        card.innerHTML = `
            <div class="skill-number">${habilidade.habilidade}</div>
            <div class="skill-code">(${habilidade.descritor})</div>
            <div class="skill-percentage">${percentage}%</div>
            ${isEscolaData ? '<div class="skill-source">Escola</div>' : ''}
        `;

        card.addEventListener('click', () => {
            this.showHabilidadeDetails(habilidade, percentage);
        });

        return card;
    }

    getColorClass(percentage) {
        if (percentage <= 40) return 'red';
        if (percentage <= 60) return 'orange';
        if (percentage <= 80) return 'light-blue';
        return 'teal';
    }

    showHabilidadeDetails(habilidade, percentage) {
        const modal = document.getElementById('modal');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');
        const details = document.getElementById('modal-details');

        title.innerHTML = `📋 ${habilidade.habilidade} - <span style="color: #6366f1;">${habilidade.descritor}</span>`;
        
        const mediaGeral = parseInt(habilidade.media_geral.replace('%', ''));
        const isEscolaEspecifica = this.currentFilters.escola && 
                                   this.currentFilters.escola !== '' && 
                                   this.currentFilters.escola !== 'geral';
        
        const performanceIcon = this.getPerformanceIcon(percentage);
        let descriptionHtml = `
            ${performanceIcon} <strong>Percentual de Acerto:</strong> <span style="font-size: 1.2em; color: ${this.getPerformanceColor(percentage)};">${percentage}%</span><br>
            📊 <strong>Classificação:</strong> ${this.getPerformanceLabel(percentage)}
        `;
        
        if (isEscolaEspecifica) {
            descriptionHtml += `<br>🏫 <strong>Escola:</strong> ${this.currentFilters.escola}`;
            descriptionHtml += `<br>📈 <strong>Média Geral da Rede:</strong> ${mediaGeral}%`;
            const diferenca = percentage - mediaGeral;
            const diferencaTexto = diferenca > 0 ? `+${diferenca}%` : `${diferenca}%`;
            const diferencaIcon = diferenca > 0 ? '📈' : diferenca < 0 ? '📉' : '➖';
            descriptionHtml += `<br>${diferencaIcon} <strong>Diferença da Média:</strong> <span style="color: ${diferenca >= 0 ? '#10b981' : '#ef4444'};">${diferencaTexto}</span>`;
        }
        
        description.innerHTML = descriptionHtml;

        // Adicionar detalhes por escola se disponível e não estiver vendo escola específica
        if (this.filteredData.por_escola && !isEscolaEspecifica) {
            let escolasHtml = '<h4>🏫 Desempenho por Escola:</h4><ul>';
            this.filteredData.por_escola.forEach(escola => {
                const escolaPercentual = escola.habilidades[habilidade.habilidade];
                if (escolaPercentual) {
                    const escPerc = parseInt(escolaPercentual.replace('%', ''));
                    const escIcon = this.getPerformanceIcon(escPerc);
                    escolasHtml += `<li><span>${escola.escola}</span><span>${escIcon} ${escolaPercentual}</span></li>`;
                }
            });
            escolasHtml += '</ul>';
            details.innerHTML = escolasHtml;
        } else if (isEscolaEspecifica) {
            details.innerHTML = '<p><em>💡 Dados específicos desta escola em relação à rede educacional.</em></p>';
        } else {
            details.innerHTML = '<p>ℹ️ Informações detalhadas não disponíveis.</p>';
        }

        modal.style.display = 'flex';
        // Trigger animation
        setTimeout(() => modal.classList.add('show'), 10);
    }

    getPerformanceIcon(percentage) {
        if (percentage <= 40) return '🔴';
        if (percentage <= 60) return '🟠';
        if (percentage <= 80) return '🔵';
        return '🟢';
    }

    getPerformanceColor(percentage) {
        if (percentage <= 40) return '#ef4444';
        if (percentage <= 60) return '#f59e0b';
        if (percentage <= 80) return '#3b82f6';
        return '#10b981';
    }

    // Função para verificar se houve mudanças no arquivo
    async checkForUpdates() {
        try {
            const response = await fetch('CICLO_III_2025.yaml', {
                method: 'HEAD', // Apenas headers, sem baixar o conteúdo
                cache: 'no-cache'
            });
            
            const newLastModified = response.headers.get('Last-Modified') || new Date().toISOString();
            
            if (this.lastModified && newLastModified !== this.lastModified) {
                console.log('🔄 Arquivo YAML foi atualizado, recarregando dados...');
                this.showUpdateNotification('🔄 Dados atualizados automaticamente!');
                await this.reloadData();
            }
            
        } catch (error) {
            console.warn('⚠️ Não foi possível verificar atualizações:', error);
        }
    }

    // Função para recarregar dados mantendo filtros atuais
    async reloadData() {
        const previousFilters = { ...this.currentFilters };
        
        try {
            await this.loadData();
            this.populateFilters();
            
            // Restaurar filtros anteriores se ainda existirem
            this.restoreFilters(previousFilters);
            this.applyFilters();
            
        } catch (error) {
            console.error('❌ Erro ao recarregar dados:', error);
            this.showUpdateNotification('❌ Erro ao atualizar dados', 'error');
        }
    }

    // Restaurar filtros após reload
    restoreFilters(previousFilters) {
        Object.keys(previousFilters).forEach(filterKey => {
            const selectElement = document.getElementById(this.getSelectId(filterKey));
            if (selectElement && previousFilters[filterKey]) {
                // Verificar se a opção ainda existe
                const optionExists = Array.from(selectElement.options).some(
                    option => option.value === previousFilters[filterKey]
                );
                
                if (optionExists) {
                    selectElement.value = previousFilters[filterKey];
                    this.currentFilters[filterKey] = previousFilters[filterKey];
                } else {
                    // Se a opção não existe mais, resetar o filtro
                    selectElement.value = '';
                    this.currentFilters[filterKey] = '';
                }
            }
        });
    }

    // Helper para mapear nomes de filtros para IDs dos selects
    getSelectId(filterKey) {
        const mapping = {
            avaliacao: 'avaliacao',
            anoEscolar: 'ano-escolar',
            componente: 'componente',
            rede: 'rede',
            escola: 'escola',
            performance: 'performance-range'
        };
        return mapping[filterKey];
    }

    // Iniciar verificação automática (a cada 30 segundos)
    startAutoReload() {
        if (this.autoReloadInterval) {
            clearInterval(this.autoReloadInterval);
        }
        
        this.autoReloadInterval = setInterval(() => {
            this.checkForUpdates();
        }, 30000); // 30 segundos
        
        console.log('🔄 Auto-reload ativado (verificação a cada 30 segundos)');
        this.showUpdateNotification('🔄 Atualização automática ativada', 'info');
    }

    // Parar verificação automática
    stopAutoReload() {
        if (this.autoReloadInterval) {
            clearInterval(this.autoReloadInterval);
            this.autoReloadInterval = null;
            console.log('⏹️ Auto-reload desativado');
        }
    }

    // Mostrar notificações de atualização
    showUpdateNotification(message, type = 'success') {
        // Remover notificação existente se houver
        const existingNotification = document.querySelector('.update-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `update-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar com animação
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-remover após 4 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
    }

    closeModal() {
        const modal = document.getElementById('modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    getPerformanceLabel(percentage) {
        if (percentage <= 40) return 'Crítico (até 40%)';
        if (percentage <= 60) return 'Baixo (41% a 60%)';
        if (percentage <= 80) return 'Intermediário (61% a 80%)';
        return 'Adequado (acima de 80%)';
    }
}

// Inicializar o dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new DashboardController();
});