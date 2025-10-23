// Analytics Page JavaScript
let yamlData = null;

// Dados simulados para Ciclo I e Ciclo II
const simulatedData = {
    cicloI: {
        title: "Ciclo I (2023)",
        subtitle: "Dados históricos simulados",
        adequado: 45,
        intermediario: 30,
        defasagem: 25
    },
    cicloII: {
        title: "Ciclo II (2024)",
        subtitle: "Dados do ano anterior",
        adequado: 52,
        intermediario: 28,
        defasagem: 20
    }
};

// Simulação de dados variados para os ciclos anteriores
function generateRandomCycleData() {
    const randomAdequado = Math.floor(Math.random() * 30) + 35; // 35-65%
    const randomDefasagem = Math.floor(Math.random() * 20) + 15; // 15-35%
    const randomIntermediario = 100 - randomAdequado - randomDefasagem;
    
    return {
        adequado: randomAdequado,
        intermediario: randomIntermediario,
        defasagem: randomDefasagem
    };
}

// Gerar dados aleatórios na inicialização
simulatedData.cicloI = {
    ...simulatedData.cicloI,
    ...generateRandomCycleData()
};

simulatedData.cicloII = {
    ...simulatedData.cicloII,
    ...generateRandomCycleData()
};

// Função para carregar dados do YAML
async function loadYAMLData() {
    try {
        const response = await fetch('CICLO_III_2025.yaml');
        const yamlText = await response.text();
        yamlData = jsyaml.load(yamlText);
        
        populateFilters();
        updateAnalytics();
    } catch (error) {
        console.error('Erro ao carregar dados YAML:', error);
        // Usar dados simulados se houver erro
        showErrorMessage();
    }
}

// Função para popular os filtros com dados do YAML
function populateFilters() {
    if (!yamlData || !yamlData.ciclo_iii || !yamlData.ciclo_iii.data) return;
    
    const data = yamlData.ciclo_iii.data;
    
    // Popular escolas
    const escolas = [...new Set(data.map(item => item.escola))];
    const escolaSelect = document.getElementById('escola-filter');
    escolaSelect.innerHTML = '<option value="">Todas as escolas</option>';
    escolas.forEach(escola => {
        escolaSelect.innerHTML += `<option value="${escola}">${escola}</option>`;
    });
    
    // Popular anos
    const anos = [...new Set(data.map(item => item.ano))].sort();
    const anoSelect = document.getElementById('ano-filter');
    anoSelect.innerHTML = '<option value="">Todos os anos</option>';
    anos.forEach(ano => {
        anoSelect.innerHTML += `<option value="${ano}">${ano}º ano</option>`;
    });
    
    // Popular componentes
    const componentes = [...new Set(data.map(item => item.componente_curricular))];
    const componenteSelect = document.getElementById('componente-filter');
    componenteSelect.innerHTML = '<option value="">Todos os componentes</option>';
    componentes.forEach(componente => {
        componenteSelect.innerHTML += `<option value="${componente}">${componente}</option>`;
    });
}

// Função para calcular estatísticas do Ciclo III baseado nos filtros
function calculateCicloIIIStats() {
    if (!yamlData || !yamlData.ciclo_iii || !yamlData.ciclo_iii.data) {
        return { adequado: 0, intermediario: 0, defasagem: 0 };
    }
    
    const escola = document.getElementById('escola-filter').value;
    const ano = document.getElementById('ano-filter').value;
    const componente = document.getElementById('componente-filter').value;
    
    let filteredData = yamlData.ciclo_iii.data;
    
    if (escola) {
        filteredData = filteredData.filter(item => item.escola === escola);
    }
    if (ano) {
        filteredData = filteredData.filter(item => item.ano.toString() === ano);
    }
    if (componente) {
        filteredData = filteredData.filter(item => item.componente_curricular === componente);
    }
    
    if (filteredData.length === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0 };
    }
    
    let totalAdequado = 0;
    let totalIntermediario = 0;
    let totalDefasagem = 0;
    let totalAlunos = 0;
    
    filteredData.forEach(item => {
        const competencias = item.competencias || {};
        Object.values(competencias).forEach(competencia => {
            if (competencia.nivel_aprendizado) {
                totalAlunos++;
                switch (competencia.nivel_aprendizado.toLowerCase()) {
                    case 'adequado':
                        totalAdequado++;
                        break;
                    case 'intermediario':
                    case 'intermediário':
                        totalIntermediario++;
                        break;
                    case 'defasagem':
                        totalDefasagem++;
                        break;
                }
            }
        });
    });
    
    if (totalAlunos === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0 };
    }
    
    return {
        adequado: Math.round((totalAdequado / totalAlunos) * 100),
        intermediario: Math.round((totalIntermediario / totalAlunos) * 100),
        defasagem: Math.round((totalDefasagem / totalAlunos) * 100)
    };
}

// Função para atualizar o card de um ciclo
function updateCycleCard(cardId, data, title, subtitle) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Atualizar título e subtítulo
    card.querySelector('h3').textContent = title;
    card.querySelector('.cycle-subtitle').textContent = subtitle;
    
    // Atualizar percentual de aprendizado adequado
    card.querySelector('.cycle-percentage').textContent = `${data.adequado}%`;
    
    // Atualizar barra de progresso
    const progressBar = card.querySelector('.progress-bar');
    progressBar.innerHTML = `
        <div class="progress-segment defasagem" style="width: ${data.defasagem}%"></div>
        <div class="progress-segment intermediario" style="width: ${data.intermediario}%"></div>
        <div class="progress-segment adequado" style="width: ${data.adequado}%"></div>
    `;
    
    // Atualizar legenda
    const legend = card.querySelector('.legend');
    legend.innerHTML = `
        <div class="legend-item">
            <div class="legend-color adequado"></div>
            <span class="legend-text">Aprendizado Adequado</span>
            <span class="legend-percent">${data.adequado}%</span>
        </div>
        <div class="legend-item">
            <div class="legend-color intermediario"></div>
            <span class="legend-text">Aprendizado Intermediário</span>
            <span class="legend-percent">${data.intermediario}%</span>
        </div>
        <div class="legend-item">
            <div class="legend-color defasagem"></div>
            <span class="legend-text">Defasagem na Aprendizagem</span>
            <span class="legend-percent">${data.defasagem}%</span>
        </div>
    `;
}

// Função principal para atualizar todos os cards
function updateAnalytics() {
    // Atualizar Ciclo I com dados simulados
    updateCycleCard('ciclo-1-card', simulatedData.cicloI, 'Ciclo I (2023)', 'Dados históricos simulados');
    
    // Atualizar Ciclo II com dados simulados
    updateCycleCard('ciclo-2-card', simulatedData.cicloII, 'Ciclo II (2024)', 'Dados do ano anterior');
    
    // Atualizar Ciclo III com dados reais do YAML
    const cicloIIIData = calculateCicloIIIStats();
    updateCycleCard('ciclo-3-card', cicloIIIData, 'Ciclo III (2025)', 'Dados atuais - Análise em tempo real');
}

// Função para mostrar mensagem de erro
function showErrorMessage() {
    const container = document.querySelector('.cycles-comparison');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
                <h3>⚠️ Erro ao carregar dados</h3>
                <p>Não foi possível carregar os dados do arquivo YAML. Verifique se o arquivo existe e está acessível.</p>
            </div>
        `;
    }
}

// Função para gerar novos dados aleatórios para os ciclos anteriores
function regenerateRandomData() {
    simulatedData.cicloI = {
        ...simulatedData.cicloI,
        ...generateRandomCycleData()
    };
    
    simulatedData.cicloII = {
        ...simulatedData.cicloII,
        ...generateRandomCycleData()
    };
    
    updateAnalytics();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadYAMLData();
    
    // Adicionar listeners aos filtros
    document.getElementById('escola-filter').addEventListener('change', updateAnalytics);
    document.getElementById('ano-filter').addEventListener('change', updateAnalytics);
    document.getElementById('componente-filter').addEventListener('change', updateAnalytics);
    
    // Adicionar botão para regenerar dados aleatórios (para demonstração)
    const filtersBar = document.querySelector('.filters-bar');
    if (filtersBar) {
        const regenerateBtn = document.createElement('button');
        regenerateBtn.textContent = '🎲 Gerar Novos Dados Históricos';
        regenerateBtn.className = 'new-page-btn';
        regenerateBtn.style.marginLeft = '20px';
        regenerateBtn.onclick = regenerateRandomData;
        
        const filtersContainer = filtersBar.querySelector('.filters-container');
        if (filtersContainer) {
            filtersContainer.appendChild(regenerateBtn);
        }
    }
});

// Função para voltar ao dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}