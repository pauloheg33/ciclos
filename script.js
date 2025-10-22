class DashboardController {
    constructor() {
        this.data = [];
        this.filteredData = null;
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
        // Mostrar mensagem inicial
        this.showInitialMessage();
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
            const response = await fetch('CICLO_III_2025.yaml');
            const yamlText = await response.text();
            this.data = jsyaml.load(yamlText);
            console.log('Dados carregados:', this.data);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
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
            document.getElementById('modal').style.display = 'none';
        });

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('modal');
            if (e.target === modal) {
                modal.style.display = 'none';
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

        title.textContent = `${habilidade.habilidade} - ${habilidade.descritor}`;
        
        const mediaGeral = parseInt(habilidade.media_geral.replace('%', ''));
        const isEscolaEspecifica = this.currentFilters.escola && 
                                   this.currentFilters.escola !== '' && 
                                   this.currentFilters.escola !== 'geral';
        
        let descriptionHtml = `
            <strong>Percentual de Acerto:</strong> ${percentage}%<br>
            <strong>Classificação:</strong> ${this.getPerformanceLabel(percentage)}
        `;
        
        if (isEscolaEspecifica) {
            descriptionHtml += `<br><strong>Escola:</strong> ${this.currentFilters.escola}`;
            descriptionHtml += `<br><strong>Média Geral da Rede:</strong> ${mediaGeral}%`;
            const diferenca = percentage - mediaGeral;
            const diferencaTexto = diferenca > 0 ? `+${diferenca}%` : `${diferenca}%`;
            descriptionHtml += `<br><strong>Diferença da Média:</strong> ${diferencaTexto}`;
        }
        
        description.innerHTML = descriptionHtml;

        // Adicionar detalhes por escola se disponível e não estiver vendo escola específica
        if (this.filteredData.por_escola && !isEscolaEspecifica) {
            let escolasHtml = '<h4>Desempenho por Escola:</h4><ul>';
            this.filteredData.por_escola.forEach(escola => {
                const escolaPercentual = escola.habilidades[habilidade.habilidade];
                if (escolaPercentual) {
                    escolasHtml += `<li><strong>${escola.escola}:</strong> ${escolaPercentual}</li>`;
                }
            });
            escolasHtml += '</ul>';
            details.innerHTML = escolasHtml;
        } else if (isEscolaEspecifica) {
            details.innerHTML = '<p><em>Dados específicos desta escola em relação à rede.</em></p>';
        } else {
            details.innerHTML = '<p>Informações detalhadas não disponíveis.</p>';
        }

        modal.style.display = 'flex';
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