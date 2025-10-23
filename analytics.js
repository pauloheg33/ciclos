// Analytics Page JavaScript
let yamlData = null;
let filteredCards = [];

// Dados reais do Ciclo I baseados na análise fornecida
const cicloIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 18.8, intermediario: 31.2, adequado: 50.0, media: 83.6 },
            "EEF FIRMINO JOSE": { defasagem: 6.2, intermediario: 25.0, adequado: 68.8, media: 88.4 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 25.0, intermediario: 37.5, adequado: 37.5, media: 79.2 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 12.5, intermediario: 25.0, adequado: 62.5, media: 86.8 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 18.8, intermediario: 43.8, adequado: 37.5, media: 81.4 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 25.0, intermediario: 43.8, adequado: 31.2, media: 78.9 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 14.7, intermediario: 32.4, adequado: 52.9, media: 85.2 },
            "EEF FIRMINO JOSE": { defasagem: 11.8, intermediario: 29.4, adequado: 58.8, media: 87.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 17.6, intermediario: 35.3, adequado: 47.1, media: 83.4 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.6, intermediario: 38.2, adequado: 41.2, media: 81.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 11.8, intermediario: 32.4, adequado: 55.9, media: 86.5 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 16.7, intermediario: 38.9, adequado: 44.4, media: 82.9 },
            "EEF FIRMINO JOSE": { defasagem: 13.9, intermediario: 36.1, adequado: 50.0, media: 85.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.4, intermediario: 27.8, adequado: 52.8, media: 84.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 25.0, intermediario: 33.3, adequado: 41.7, media: 80.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 19.4, intermediario: 30.6, adequado: 50.0, media: 83.8 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 20.0, intermediario: 33.3, adequado: 46.7, media: 84.2 },
            "EEF FIRMINO JOSE": { defasagem: 23.3, intermediario: 36.7, adequado: 40.0, media: 81.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 13.3, intermediario: 26.7, adequado: 60.0, media: 86.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.0, intermediario: 33.3, adequado: 46.7, media: 83.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 26.7, intermediario: 40.0, adequado: 33.3, media: 78.5 }
        }
    }
};

// Dados reais do Ciclo II baseados na análise fornecida
const cicloIIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 18.8, intermediario: 31.2, adequado: 50.0, media: 77.6 },
            "EEF FIRMINO JOSE": { defasagem: 6.2, intermediario: 25.0, adequado: 68.8, media: 88.4 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 25.0, intermediario: 37.5, adequado: 37.5, media: 79.2 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 12.5, intermediario: 25.0, adequado: 62.5, media: 79.8 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 18.8, intermediario: 43.8, adequado: 37.5, media: 81.4 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 25.0, intermediario: 43.8, adequado: 31.2, media: 78.9 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 14.7, intermediario: 32.4, adequado: 52.9, media: 78.2 },
            "EEF FIRMINO JOSE": { defasagem: 11.8, intermediario: 29.4, adequado: 58.8, media: 87.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 17.6, intermediario: 35.3, adequado: 47.1, media: 77.4 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.6, intermediario: 38.2, adequado: 41.2, media: 81.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 11.8, intermediario: 32.4, adequado: 55.9, media: 79.5 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 16.7, intermediario: 38.9, adequado: 44.4, media: 82.9 },
            "EEF FIRMINO JOSE": { defasagem: 13.9, intermediario: 36.1, adequado: 50.0, media: 78.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.4, intermediario: 27.8, adequado: 52.8, media: 84.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 25.0, intermediario: 33.3, adequado: 41.7, media: 80.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 19.4, intermediario: 30.6, adequado: 50.0, media: 77.8 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 20.0, intermediario: 33.3, adequado: 46.7, media: 84.2 },
            "EEF FIRMINO JOSE": { defasagem: 23.3, intermediario: 36.7, adequado: 40.0, media: 81.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 13.3, intermediario: 26.7, adequado: 60.0, media: 79.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.0, intermediario: 33.3, adequado: 46.7, media: 77.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 26.7, intermediario: 40.0, adequado: 33.3, media: 78.5 }
        }
    }
};

// Dados reais do Ciclo III baseados na análise fornecida
const cicloIIIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 31.2, intermediario: 37.5, adequado: 31.2, media: 68.3 },
            "EEF FIRMINO JOSE": { defasagem: 12.5, intermediario: 37.5, adequado: 50.0, media: 80.4 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 43.8, intermediario: 31.2, adequado: 25.0, media: 66.5 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 50.0, intermediario: 18.8, adequado: 31.2, media: 69.5 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 25.0, intermediario: 62.5, adequado: 12.5, media: 67.5 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 43.8, intermediario: 37.5, adequado: 18.8, media: 66.8 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 31.6, intermediario: 21.1, adequado: 47.4, media: 75.1 },
            "EEF FIRMINO JOSE": { defasagem: 47.4, intermediario: 31.6, adequado: 21.1, media: 63.8 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 26.3, intermediario: 26.3, adequado: 47.4, media: 78.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 42.1, intermediario: 26.3, adequado: 31.6, media: 71.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 47.4, intermediario: 26.3, adequado: 26.3, media: 67.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 10.5, intermediario: 47.4, adequado: 42.1, media: 77.9 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 11.8, intermediario: 29.4, adequado: 58.8, media: 82.3 },
            "EEF FIRMINO JOSE": { defasagem: 17.6, intermediario: 11.8, adequado: 70.6, media: 83.8 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 23.5, intermediario: 58.8, adequado: 17.6, media: 67.8 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 35.3, intermediario: 41.2, adequado: 23.5, media: 66.7 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 11.8, intermediario: 41.2, adequado: 47.1, media: 80.0 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 19.0, intermediario: 33.3, adequado: 47.6, media: 77.7 },
            "EEF FIRMINO JOSE": { defasagem: 28.6, intermediario: 38.1, adequado: 33.3, media: 72.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 38.1, intermediario: 28.6, adequado: 33.3, media: 70.9 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 33.3, intermediario: 42.9, adequado: 23.8, media: 68.4 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 42.9, intermediario: 28.6, adequado: 28.6, media: 69.6 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 27.8, intermediario: 38.9, adequado: 33.3, media: 72.2 },
            "EEF FIRMINO JOSE": { defasagem: 27.8, intermediario: 50.0, adequado: 22.2, media: 69.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 22.2, intermediario: 22.2, adequado: 55.6, media: 80.6 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 33.3, intermediario: 33.3, adequado: 33.3, media: 71.7 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 11.1, intermediario: 66.7, adequado: 22.2, media: 70.0 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 15.8, intermediario: 42.1, adequado: 42.1, media: 78.6 },
            "EEF FIRMINO JOSE": { defasagem: 42.1, intermediario: 26.3, adequado: 31.6, media: 68.9 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 47.4, intermediario: 21.1, adequado: 31.6, media: 69.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 31.6, intermediario: 31.6, adequado: 36.8, media: 72.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 10.5, intermediario: 57.9, adequado: 31.6, media: 74.2 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 31.6, intermediario: 36.8, adequado: 31.6, media: 72.2 },
            "EEF FIRMINO JOSE": { defasagem: 57.9, intermediario: 15.8, adequado: 26.3, media: 66.7 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 47.4, intermediario: 26.3, adequado: 26.3, media: 67.1 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 15.8, intermediario: 31.6, adequado: 52.6, media: 78.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 57.9, intermediario: 21.1, adequado: 21.1, media: 61.4 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 47.6, intermediario: 19.0, adequado: 33.3, media: 68.9 },
            "EEF FIRMINO JOSE": { defasagem: 52.4, intermediario: 33.3, adequado: 14.3, media: 64.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 42.9, intermediario: 38.1, adequado: 19.0, media: 65.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 33.3, intermediario: 28.6, adequado: 38.1, media: 72.0 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 33.3, intermediario: 28.6, adequado: 38.1, media: 71.7 }
        }
    }
};

// Mapeamento das escolas por ano e componente curricular
const escolasPorFiltro = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE", 
            "EEF FRANCISCO MOURAO LIMA",
            "EEIEF 03 DE DEZEMBRO",
            "EEIEF ANTONIO DE SOUSA BARROS",
            "EEIEF JOSE ALVES DE SENA"
        ],
        "Matemática": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE",
            "EEF FRANCISCO MOURAO LIMA", 
            "EEIEF 03 DE DEZEMBRO",
            "EEIEF ANTONIO DE SOUSA BARROS",
            "EEIEF JOSE ALVES DE SENA"
        ]
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE",
            "EEIEF 03 DE DEZEMBRO", 
            "EEIEF ANTONIO DE SOUSA BARROS",
            "EEIEF JOSE ALVES DE SENA"
        ],
        "Matemática": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE",
            "EEIEF 03 DE DEZEMBRO",
            "EEIEF ANTONIO DE SOUSA BARROS", 
            "EEIEF JOSE ALVES DE SENA"
        ]
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE",
            "EEIEF 03 DE DEZEMBRO",
            "EEIEF ANTONIO DE SOUSA BARROS",
            "EEIEF JOSE ALVES DE SENA"
        ]
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": [
            "EEF 21 DE DEZEMBRO",
            "EEF FIRMINO JOSE",
            "EEIEF 03 DE DEZEMBRO",
            "EEIEF ANTONIO DE SOUSA BARROS", 
            "EEIEF JOSE ALVES DE SENA"
        ]
    }
};

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
    updateEscolasFilter();
    
    console.log('✅ Filtros populados:', {
        avaliacoes: avaliacoes.length,
        anos: anos.length,
        componentes: componentes.length,
        redes: redes.length
    });
}

// Função para atualizar o filtro de escolas baseado no ano e componente selecionados
function updateEscolasFilter() {
    const anoSelect = document.getElementById('ano-escolar');
    const componenteSelect = document.getElementById('componente');
    const escolaSelect = document.getElementById('escola');
    
    const anoSelecionado = anoSelect.value;
    const componenteSelecionado = componenteSelect.value;
    
    // Limpar opções atuais
    escolaSelect.innerHTML = '<option value="">Selecione a escola</option><option value="geral">📊 Média Geral</option>';
    
    // Se ano e componente estiverem selecionados, popular escolas específicas
    if (anoSelecionado && componenteSelecionado && escolasPorFiltro[anoSelecionado] && escolasPorFiltro[anoSelecionado][componenteSelecionado]) {
        const escolas = escolasPorFiltro[anoSelecionado][componenteSelecionado];
        
        escolas.forEach(escola => {
            const option = document.createElement('option');
            option.value = escola;
            option.textContent = escola;
            escolaSelect.appendChild(option);
        });
        
        console.log(`📚 Escolas carregadas para ${anoSelecionado} - ${componenteSelecionado}:`, escolas.length);
    } else {
        // Se não houver filtros específicos, tentar carregar do YAML
        if (yamlData && yamlData.length > 0) {
            const todasEscolas = [...new Set(yamlData.flatMap(item => 
                item.escolas ? item.escolas.map(e => e.escola) : []
            ))];
            
            todasEscolas.forEach(escola => {
                const option = document.createElement('option');
                option.value = escola;
                option.textContent = escola;
                escolaSelect.appendChild(option);
            });
        }
    }
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
    
    // Aplicar faixa de performance
    const performanceSelect = document.getElementById('performance-range');
    performanceSelect.value = defaultValues.performance;
    filtersApplied++;
    
    // Atualizar escolas após aplicar filtros de ano e componente
    setTimeout(() => {
        updateEscolasFilter();
        
        // Aplicar escola padrão após carregar as opções
        const escolaSelect = document.getElementById('escola');
        for (let option of escolaSelect.options) {
            if (option.value === defaultValues.escola) {
                option.selected = true;
                filtersApplied++;
                break;
            }
        }
        
        console.log(`📊 Filtros aplicados: ${filtersApplied}/6`);
    }, 100);
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

// Função para calcular performance do Ciclo I baseada nos dados reais
function calculateCicloIPerformance() {
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const escola = document.getElementById('escola').value;
    
    if (!ano || !componente) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    // Verificar se temos dados para esta combinação
    if (!cicloIData[ano] || !cicloIData[ano][componente]) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    const dadosAnoComponente = cicloIData[ano][componente];
    
    if (escola && escola !== 'geral' && dadosAnoComponente[escola]) {
        // Dados de escola específica
        const dadosEscola = dadosAnoComponente[escola];
        return {
            adequado: Math.round(dadosEscola.adequado),
            intermediario: Math.round(dadosEscola.intermediario),
            defasagem: Math.round(dadosEscola.defasagem),
            total: 1,
            media: dadosEscola.media
        };
    } else {
        // Média geral de todas as escolas
        const escolas = Object.values(dadosAnoComponente);
        let somaDefasagem = 0, somaIntermediario = 0, somaAdequado = 0;
        
        escolas.forEach(escola => {
            somaDefasagem += escola.defasagem;
            somaIntermediario += escola.intermediario;
            somaAdequado += escola.adequado;
        });
        
        const totalEscolas = escolas.length;
        return {
            adequado: Math.round(somaAdequado / totalEscolas),
            intermediario: Math.round(somaIntermediario / totalEscolas),
            defasagem: Math.round(somaDefasagem / totalEscolas),
            total: totalEscolas,
            media: Math.round(escolas.reduce((acc, e) => acc + e.media, 0) / totalEscolas)
        };
    }
}

// Função para calcular performance do Ciclo II baseada nos dados reais
function calculateCicloIIPerformance() {
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const escola = document.getElementById('escola').value;
    
    if (!ano || !componente) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    // Verificar se temos dados para esta combinação
    if (!cicloIIData[ano] || !cicloIIData[ano][componente]) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    const dadosAnoComponente = cicloIIData[ano][componente];
    
    if (escola && escola !== 'geral' && dadosAnoComponente[escola]) {
        // Dados de escola específica
        const dadosEscola = dadosAnoComponente[escola];
        return {
            adequado: Math.round(dadosEscola.adequado),
            intermediario: Math.round(dadosEscola.intermediario),
            defasagem: Math.round(dadosEscola.defasagem),
            total: 1,
            media: dadosEscola.media
        };
    } else {
        // Média geral de todas as escolas
        const escolas = Object.values(dadosAnoComponente);
        let somaDefasagem = 0, somaIntermediario = 0, somaAdequado = 0;
        
        escolas.forEach(escola => {
            somaDefasagem += escola.defasagem;
            somaIntermediario += escola.intermediario;
            somaAdequado += escola.adequado;
        });
        
        const totalEscolas = escolas.length;
        return {
            adequado: Math.round(somaAdequado / totalEscolas),
            intermediario: Math.round(somaIntermediario / totalEscolas),
            defasagem: Math.round(somaDefasagem / totalEscolas),
            total: totalEscolas,
            media: Math.round(escolas.reduce((acc, e) => acc + e.media, 0) / totalEscolas)
        };
    }
}

// Função para calcular performance do Ciclo III baseada nos dados reais
function calculateCicloIIIPerformance() {
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const escola = document.getElementById('escola').value;
    
    if (!ano || !componente) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    // Verificar se temos dados para esta combinação
    if (!cicloIIIData[ano] || !cicloIIIData[ano][componente]) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0 };
    }
    
    const dadosAnoComponente = cicloIIIData[ano][componente];
    
    if (escola && escola !== 'geral' && dadosAnoComponente[escola]) {
        // Dados de escola específica
        const dadosEscola = dadosAnoComponente[escola];
        return {
            adequado: Math.round(dadosEscola.adequado),
            intermediario: Math.round(dadosEscola.intermediario),
            defasagem: Math.round(dadosEscola.defasagem),
            total: 1,
            media: dadosEscola.media
        };
    } else {
        // Média geral de todas as escolas
        const escolas = Object.values(dadosAnoComponente);
        let somaDefasagem = 0, somaIntermediario = 0, somaAdequado = 0;
        
        escolas.forEach(escola => {
            somaDefasagem += escola.defasagem;
            somaIntermediario += escola.intermediario;
            somaAdequado += escola.adequado;
        });
        
        const totalEscolas = escolas.length;
        return {
            adequado: Math.round(somaAdequado / totalEscolas),
            intermediario: Math.round(somaIntermediario / totalEscolas),
            defasagem: Math.round(somaDefasagem / totalEscolas),
            total: totalEscolas,
            media: Math.round(escolas.reduce((acc, e) => acc + e.media, 0) / totalEscolas)
        };
    }
}

// Função para atualizar o card de um ciclo
function updateCycleCard(cardId, data, title, subtitle) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Atualizar título
    card.querySelector('h2').textContent = title;
    
    // Atualizar percentual com a média geral da escola naquele ano e componente
    card.querySelector('.percentage-large').textContent = `${data.media || 0}%`;
    
    // Atualizar barra de progresso
    const progressBar = card.querySelector('.progress-bar-horizontal');
    progressBar.innerHTML = `
        <div class="segment defasagem" style="width: ${data.defasagem}%"></div>
        <div class="segment intermediario" style="width: ${data.intermediario}%"></div>
        <div class="segment adequado" style="width: ${data.adequado}%"></div>
    `;
    
    // Atualizar legenda apenas com percentuais
    const legendList = card.querySelector('.legend-list');
    legendList.innerHTML = `
        <div class="legend-item">
            <span class="legend-dot defasagem"></span>
            <span class="legend-text">Defasagem</span>
            <span class="legend-percent">${data.defasagem}%</span>
        </div>
        <div class="legend-item">
            <span class="legend-dot intermediario"></span>
            <span class="legend-text">Aprendizado intermediário</span>
            <span class="legend-percent">${data.intermediario}%</span>
        </div>
        <div class="legend-item">
            <span class="legend-dot adequado"></span>
            <span class="legend-text">Aprendizado adequado</span>
            <span class="legend-percent">${data.adequado}%</span>
        </div>
    `;
}

// Função principal para atualizar todos os cards
function updateAnalytics() {
    // Calcular performance real dos três ciclos baseada nos dados reais
    const cicloIPerformance = calculateCicloIPerformance();
    const cicloIIPerformance = calculateCicloIIPerformance();
    const cicloIIIPerformance = calculateCicloIIIPerformance();
    
    // Usar dados fixos da imagem para demonstração quando não há dados específicos
    const dadosFixos = {
        cicloI: { adequado: 98, intermediario: 2, defasagem: 1 },
        cicloII: { adequado: 98, intermediario: 1, defasagem: 1 },
        cicloIII: { adequado: 97, intermediario: 2, defasagem: 1 }
    };
    
    // Atualizar cards com dados reais ou fixos
    if (cicloIPerformance.total > 0) {
        updateCycleCard('ciclo-1-card', cicloIPerformance, '2025 - Ciclo I', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-1-card', {...dadosFixos.cicloI, media: 98}, '2025 - Ciclo I', 'Média geral de desempenho');
    }
    
    if (cicloIIPerformance.total > 0) {
        updateCycleCard('ciclo-2-card', cicloIIPerformance, '2025 - Ciclo II', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-2-card', {...dadosFixos.cicloII, media: 98}, '2025 - Ciclo II', 'Média geral de desempenho');
    }
    
    if (cicloIIIPerformance.total > 0) {
        updateCycleCard('ciclo-3-card', cicloIIIPerformance, '2025 - Ciclo III', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-3-card', {...dadosFixos.cicloIII, media: 97}, '2025 - Ciclo III', 'Média geral de desempenho');
    }
    
    console.log('📊 Analytics atualizados com dados reais dos 3 ciclos:', {
        cicloI: cicloIPerformance,
        cicloII: cicloIIPerformance, 
        cicloIII: cicloIIIPerformance
    });
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
    
    // Listeners especiais para ano e componente que também atualizam escolas
    document.getElementById('ano-escolar').addEventListener('change', function() {
        updateEscolasFilter();
        updateAnalytics();
    });
    
    document.getElementById('componente').addEventListener('change', function() {
        updateEscolasFilter();
        updateAnalytics();
    });
    
    document.getElementById('rede').addEventListener('change', updateAnalytics);
    document.getElementById('escola').addEventListener('change', updateAnalytics);
    document.getElementById('performance-range').addEventListener('change', updateAnalytics);
});

// Função para voltar ao dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}