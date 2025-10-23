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

// Função para carregar dados do YAML (mesma do dashboard)
async function loadYAMLData() {
    try {
        const response = await fetch('CICLO_III_2025.yaml', {
            cache: 'no-cache'
        });
        
        const yamlText = await response.text();
        yamlData = jsyaml.load(yamlText);
        
        console.log('📄 Dados carregados na análise:', yamlData);
        
        populateFilters();
        
        // Aguardar um momento para os selects serem populados
        setTimeout(() => {
            setDefaultFilters();
            updateAnalytics();
        }, 200);
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        showErrorMessage();
    }
}

// Função para popular os filtros (mesma lógica do dashboard)
function populateFilters() {
    if (!yamlData || yamlData.length === 0) return;
    
    console.log('📊 Populando filtros com dados:', yamlData);
    
    // Popular avaliações - usar a mesma estrutura do dashboard
    const avaliacoes = [...new Set(yamlData.map(item => item.filtros.avaliacao))];
    const avaliacaoSelect = document.getElementById('avaliacao');
    avaliacaoSelect.innerHTML = '<option value="">Selecione uma avaliação</option>';
    avaliacoes.forEach(avaliacao => {
        const option = document.createElement('option');
        option.value = avaliacao;
        option.textContent = avaliacao;
        avaliacaoSelect.appendChild(option);
    });
    
    // Popular anos
    const anos = [...new Set(yamlData.map(item => item.filtros.ano_escolar))];
    const anoSelect = document.getElementById('ano-escolar');
    anoSelect.innerHTML = '<option value="">Selecione o ano</option>';
    anos.forEach(ano => {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        anoSelect.appendChild(option);
    });
    
    // Popular componentes
    const componentes = [...new Set(yamlData.map(item => item.filtros.componente_curricular))];
    const componenteSelect = document.getElementById('componente');
    componenteSelect.innerHTML = '<option value="">Selecione o componente</option>';
    componentes.forEach(componente => {
        const option = document.createElement('option');
        option.value = componente;
        option.textContent = componente;
        componenteSelect.appendChild(option);
    });
    
    // Popular redes
    const redes = [...new Set(yamlData.map(item => item.filtros.rede))];
    const redeSelect = document.getElementById('rede');
    redeSelect.innerHTML = '<option value="">Selecione a rede</option>';
    redes.forEach(rede => {
        const option = document.createElement('option');
        option.value = rede;
        option.textContent = rede;
        redeSelect.appendChild(option);
    });
    
    // Popular escolas (será populado quando outros filtros forem selecionados)
    const escolaSelect = document.getElementById('escola');
    escolaSelect.innerHTML = '<option value="">Selecione a escola</option><option value="geral">📊 Média Geral</option>';
    
    console.log('✅ Filtros populados:', {
        avaliacoes: avaliacoes.length,
        anos: anos.length,
        componentes: componentes.length,
        redes: redes.length
    });
}

// Função para aplicar filtros padrão (igual ao dashboard)
function setDefaultFilters() {
    console.log('🎯 Aplicando filtros padrão...');
    
    const defaultValues = {
        avaliacao: 'Avaliação Contínua da Aprendizagem - Ciclo III / 2025',
        anoEscolar: '6º ano do Ensino Fundamental',
        componente: 'Língua Portuguesa (Leitura)',
        rede: 'Pública',
        escola: 'geral',
        performance: 'all'
    };
    
    let filtersApplied = 0;
    
    // Aplicar avaliação
    const avaliacaoSelect = document.getElementById('avaliacao');
    for (let option of avaliacaoSelect.options) {
        if (option.value === defaultValues.avaliacao) {
            option.selected = true;
            filtersApplied++;
            break;
        }
    }
    
    // Aplicar ano escolar
    const anoSelect = document.getElementById('ano-escolar');
    for (let option of anoSelect.options) {
        if (option.value === defaultValues.anoEscolar) {
            option.selected = true;
            filtersApplied++;
            break;
        }
    }
    
    // Aplicar componente
    const componenteSelect = document.getElementById('componente');
    for (let option of componenteSelect.options) {
        if (option.value === defaultValues.componente) {
            option.selected = true;
            filtersApplied++;
            break;
        }
    }
    
    // Aplicar rede
    const redeSelect = document.getElementById('rede');
    for (let option of redeSelect.options) {
        if (option.value === defaultValues.rede) {
            option.selected = true;
            filtersApplied++;
            break;
        }
    }
    
    // Aplicar escola
    const escolaSelect = document.getElementById('escola');
    for (let option of escolaSelect.options) {
        if (option.value === defaultValues.escola) {
            option.selected = true;
            filtersApplied++;
            break;
        }
    }
    
    // Aplicar faixa de performance
    const performanceSelect = document.getElementById('performance-range');
    performanceSelect.value = defaultValues.performance;
    filtersApplied++;
    
    console.log(`📊 Filtros aplicados: ${filtersApplied}/6`);
}

// Função para filtrar dados baseado nos filtros selecionados
function getFilteredData() {
    if (!yamlData || yamlData.length === 0) {
        return null;
    }
    
    const avaliacao = document.getElementById('avaliacao').value;
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const rede = document.getElementById('rede').value;
    const escola = document.getElementById('escola').value;
    
    // Encontrar o item que corresponde aos filtros básicos
    const filteredItem = yamlData.find(item => {
        const filters = item.filtros;
        return filters.avaliacao === avaliacao &&
               filters.ano_escolar === ano &&
               filters.componente_curricular === componente &&
               filters.rede === rede;
    });
    
    if (!filteredItem) {
        return null;
    }
    
    // Se escola específica for selecionada, filtrar por escola
    if (escola && escola !== 'geral') {
        const escolaData = filteredItem.escolas.find(e => e.escola === escola);
        return escolaData ? [escolaData] : [];
    }
    
    // Se "Média Geral" ou nenhuma escola específica, retornar todas as escolas
    return filteredItem.escolas || [];
}

// Função para calcular performance baseada nas habilidades (igual ao dashboard)
function calculateSkillsPerformance() {
    const filteredData = getFilteredData();
    
    if (!filteredData || filteredData.length === 0) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    let adequado = 0; // Acima de 80%
    let intermediario = 0; // 41-80% 
    let defasagem = 0; // Até 40%
    let total = 0;
    
    // Processar cada escola
    filteredData.forEach(escola => {
        const habilidades = escola.habilidades || [];
        
        habilidades.forEach(habilidade => {
            if (habilidade && habilidade.percentual_acerto !== undefined) {
                const performance = parseFloat(habilidade.percentual_acerto);
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