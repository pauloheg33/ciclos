// Analytics Page JavaScript
let yamlData = null;
let filteredCards = [];

// Simulação de dados de ciclos anteriores baseados em performance de habilidades
const simulatedCycleData = {
    cicloI: {
        title: "2025 - Ciclo I",
        subtitle: "Dados históricos simulados"
    },
    cicloII: {
        title: "2025 - Ciclo II", 
        subtitle: "Dados do período anterior"
    }
};

// Função para simular performance baseada no Ciclo III com variação
function simulateCyclePerformance(cicloIIICards, variationFactor = 0.8) {
    if (!cicloIIICards || cicloIIICards.length === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    let adequado = 0; // Acima de 80%
    let intermediario = 0; // 41-80%  
    let defasagem = 0; // Até 40%
    
    cicloIIICards.forEach(card => {
        const performance = parseInt(card.dataset.performance || 0);
        const variation = Math.random() * 20 - 10; // Variação de -10% a +10%
        const simulatedPerformance = Math.max(0, Math.min(100, performance + (variation * variationFactor)));
        
        if (simulatedPerformance > 80) {
            adequado++;
        } else if (simulatedPerformance >= 41) {
            intermediario++;
        } else {
            defasagem++;
        }
    });
    
    const total = adequado + intermediario + defasagem;
    
    return {
        adequado: total > 0 ? Math.round((adequado / total) * 100) : 0,
        intermediario: total > 0 ? Math.round((intermediario / total) * 100) : 0,
        defasagem: total > 0 ? Math.round((defasagem / total) * 100) : 0,
        adequadoCount: adequado,
        total: total
    };
}

// Função para carregar dados do YAML
async function loadYAMLData() {
    try {
        const response = await fetch('CICLO_III_2025.yaml');
        const yamlText = await response.text();
        yamlData = jsyaml.load(yamlText);
        
        populateFilters();
        // Aplicar filtros pré-selecionados como no dashboard
        setDefaultFilters();
        updateAnalytics();
    } catch (error) {
        console.error('Erro ao carregar dados YAML:', error);
        showErrorMessage();
    }
}

// Função para popular os filtros (mesma lógica do dashboard)
function populateFilters() {
    if (!yamlData || !yamlData.ciclo_iii || !yamlData.ciclo_iii.data) return;
    
    const data = yamlData.ciclo_iii.data;
    
    // Popular avaliações
    const avaliacoes = [...new Set(data.map(item => item.avaliacao))];
    const avaliacaoSelect = document.getElementById('avaliacao');
    avaliacaoSelect.innerHTML = '<option value="">Selecione uma avaliação</option>';
    avaliacoes.forEach(avaliacao => {
        avaliacaoSelect.innerHTML += `<option value="${avaliacao}">${avaliacao}</option>`;
    });
    
    // Popular anos
    const anos = [...new Set(data.map(item => item.ano))].sort();
    const anoSelect = document.getElementById('ano-escolar');
    anoSelect.innerHTML = '<option value="">Selecione o ano</option>';
    anos.forEach(ano => {
        anoSelect.innerHTML += `<option value="${ano}">${ano}º ano do Ensino Fundamental</option>`;
    });
    
    // Popular componentes
    const componentes = [...new Set(data.map(item => item.componente_curricular))];
    const componenteSelect = document.getElementById('componente');
    componenteSelect.innerHTML = '<option value="">Selecione o componente</option>';
    componentes.forEach(componente => {
        componenteSelect.innerHTML += `<option value="${componente}">${componente}</option>`;
    });
    
    // Popular redes
    const redes = [...new Set(data.map(item => item.rede))];
    const redeSelect = document.getElementById('rede');
    redeSelect.innerHTML = '<option value="">Selecione a rede</option>';
    redes.forEach(rede => {
        redeSelect.innerHTML += `<option value="${rede}">${rede}</option>`;
    });
    
    // Popular escolas
    const escolas = [...new Set(data.map(item => item.escola))];
    const escolaSelect = document.getElementById('escola');
    escolaSelect.innerHTML = '<option value="">Selecione a escola</option><option value="geral">📊 Média Geral</option>';
    escolas.forEach(escola => {
        escolaSelect.innerHTML += `<option value="${escola}">${escola}</option>`;
    });
}

// Função para aplicar filtros padrão (igual ao dashboard)
function setDefaultFilters() {
    // Pré-selecionar 6º ano
    const anoSelect = document.getElementById('ano-escolar');
    for (let option of anoSelect.options) {
        if (option.value === '6') {
            option.selected = true;
            break;
        }
    }
    
    // Pré-selecionar Língua Portuguesa
    const componenteSelect = document.getElementById('componente');
    for (let option of componenteSelect.options) {
        if (option.text.includes('Língua Portuguesa')) {
            option.selected = true;
            break;
        }
    }
    
    // Pré-selecionar Rede Pública
    const redeSelect = document.getElementById('rede');
    for (let option of redeSelect.options) {
        if (option.value.toLowerCase().includes('públ')) {
            option.selected = true;
            break;
        }
    }
}

// Função para filtrar dados baseado nos filtros selecionados
function getFilteredData() {
    if (!yamlData || !yamlData.ciclo_iii || !yamlData.ciclo_iii.data) {
        return [];
    }
    
    const avaliacao = document.getElementById('avaliacao').value;
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const rede = document.getElementById('rede').value;
    const escola = document.getElementById('escola').value;
    const performanceRange = document.getElementById('performance-range').value;
    
    let filteredData = yamlData.ciclo_iii.data;
    
    // Aplicar filtros
    if (avaliacao) {
        filteredData = filteredData.filter(item => item.avaliacao === avaliacao);
    }
    if (ano) {
        filteredData = filteredData.filter(item => item.ano.toString() === ano);
    }
    if (componente) {
        filteredData = filteredData.filter(item => item.componente_curricular === componente);
    }
    if (rede) {
        filteredData = filteredData.filter(item => item.rede === rede);
    }
    if (escola && escola !== 'geral') {
        filteredData = filteredData.filter(item => item.escola === escola);
    }
    
    return filteredData;
}

// Função para calcular performance baseada nas habilidades (igual ao dashboard)
function calculateSkillsPerformance() {
    const filteredData = getFilteredData();
    
    if (filteredData.length === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    let adequado = 0; // Acima de 80%
    let intermediario = 0; // 41-80% 
    let defasagem = 0; // Até 40%
    let total = 0;
    
    // Processar cada item de dados
    filteredData.forEach(item => {
        const competencias = item.competencias || {};
        
        Object.values(competencias).forEach(competencia => {
            if (competencia && competencia.percentual_acerto !== undefined) {
                const performance = parseFloat(competencia.percentual_acerto);
                total++;
                
                if (performance > 80) {
                    adequado++;
                } else if (performance >= 41) {
                    intermediario++;
                } else {
                    defasagem++;
                }
            }
        });
    });
    
    if (total === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    return {
        adequado: Math.round((adequado / total) * 100),
        intermediario: Math.round((intermediario / total) * 100), 
        defasagem: Math.round((defasagem / total) * 100),
        adequadoCount: adequado,
        total: total
    };
}

// Função para atualizar o card de um ciclo
function updateCycleCard(cardId, data, title, subtitle) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Atualizar título
    card.querySelector('h2').textContent = title;
    
    // Atualizar percentual de habilidades com desempenho adequado
    card.querySelector('.percentage-large').textContent = `${data.adequado}%`;
    
    // Atualizar barra de progresso
    const progressBar = card.querySelector('.progress-bar-horizontal');
    progressBar.innerHTML = `
        <div class="segment defasagem" style="width: ${data.defasagem}%"></div>
        <div class="segment intermediario" style="width: ${data.intermediario}%"></div>
        <div class="segment adequado" style="width: ${data.adequado}%"></div>
    `;
    
    // Atualizar legenda
    const legendList = card.querySelector('.legend-list');
    legendList.innerHTML = `
        <div class="legend-item">
            <span class="legend-dot defasagem"></span>
            <span class="legend-text">🔴 Até 40%</span>
            <span class="legend-percent">${data.defasagem}%</span>
        </div>
        <div class="legend-item">
            <span class="legend-dot intermediario"></span>
            <span class="legend-text">🟠 De 41% a 80%</span>
            <span class="legend-percent">${data.intermediario}%</span>
        </div>
        <div class="legend-item">
            <span class="legend-dot adequado"></span>
            <span class="legend-text">🟢 Acima de 80%</span>
            <span class="legend-percent">${data.adequado}%</span>
        </div>
    `;
}

// Função principal para atualizar todos os cards
function updateAnalytics() {
    // Calcular performance real do Ciclo III baseada nos filtros
    const cicloIIIData = calculateSkillsPerformance();
    
    // Simular dados dos ciclos anteriores baseados no Ciclo III
    const cicloIData = simulateCyclePerformance(filteredCards, 0.85); // Ciclo I com 85% da variação
    const cicloIIData = simulateCyclePerformance(filteredCards, 0.90); // Ciclo II com 90% da variação
    
    // Atualizar cards
    updateCycleCard('ciclo-1-card', cicloIData, simulatedCycleData.cicloI.title, simulatedCycleData.cicloI.subtitle);
    updateCycleCard('ciclo-2-card', cicloIIData, simulatedCycleData.cicloII.title, simulatedCycleData.cicloII.subtitle);
    updateCycleCard('ciclo-3-card', cicloIIIData, '2025 - Ciclo III', 'Dados atuais - Análise em tempo real');
    
    // Mostrar informações de debug
    console.log('Ciclo III Performance:', cicloIIIData);
    console.log('Total de habilidades analisadas:', cicloIIIData.total);
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

// Função para mostrar mensagem de erro
function showErrorMessage() {
    const container = document.querySelector('.cycles-grid');
    if (container) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
                <h3>⚠️ Erro ao carregar dados</h3>
                <p>Não foi possível carregar os dados do arquivo YAML. Verifique se o arquivo existe e está acessível.</p>
            </div>
        `;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadYAMLData();
    
    // Adicionar listeners aos filtros (mesmos IDs do dashboard)
    document.getElementById('avaliacao').addEventListener('change', updateAnalytics);
    document.getElementById('ano-escolar').addEventListener('change', updateAnalytics);
    document.getElementById('componente').addEventListener('change', updateAnalytics);
    document.getElementById('rede').addEventListener('change', updateAnalytics);
    document.getElementById('escola').addEventListener('change', updateAnalytics);
    document.getElementById('performance-range').addEventListener('change', updateAnalytics);
});

// Função para voltar ao dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}