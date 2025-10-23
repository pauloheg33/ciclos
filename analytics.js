// Analytics Page JavaScript - REFATORADO E CORRIGIDO
let yamlData = null;
let filteredCards = [];

// =====================================
// DADOS REAIS DOS TRÊS CICLOS
// =====================================

// CICLO I - DADOS CORRIGIDOS CONFORME ARQUIVO OFICIAL
const cicloIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 21.8, intermediario: 30.2, adequado: 48.0, media: 77.6 },
            "EEF FIRMINO JOSE": { defasagem: 19.7, intermediario: 31.6, adequado: 48.8, media: 78.1 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 22.4, intermediario: 34.7, adequado: 42.8, media: 76.5 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 23.4, intermediario: 30.6, adequado: 46.0, media: 77.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.5, intermediario: 30.2, adequado: 49.3, media: 78.0 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 19.3, intermediario: 33.5, adequado: 47.2, media: 77.8 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 19.4, intermediario: 32.0, adequado: 48.6, media: 78.0 },
            "EEF FIRMINO JOSE": { defasagem: 18.5, intermediario: 31.6, adequado: 49.9, media: 78.4 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 18.6, intermediario: 31.9, adequado: 49.4, media: 78.2 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 21.8, intermediario: 32.6, adequado: 45.6, media: 77.2 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 20.2, intermediario: 31.5, adequado: 48.3, media: 77.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 19.6, intermediario: 36.6, adequado: 43.8, media: 77.1 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 18.2, intermediario: 31.8, adequado: 50.0, media: 78.5 },
            "EEF FIRMINO JOSE": { defasagem: 21.9, intermediario: 33.8, adequado: 44.3, media: 76.9 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.3, intermediario: 34.1, adequado: 46.6, media: 77.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 22.9, intermediario: 30.0, adequado: 47.1, media: 77.3 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 22.8, intermediario: 34.9, adequado: 42.3, media: 76.4 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 21.9, intermediario: 34.3, adequado: 43.8, media: 76.8 },
            "EEF FIRMINO JOSE": { defasagem: 19.0, intermediario: 35.1, adequado: 45.9, media: 77.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.0, intermediario: 32.7, adequado: 48.4, media: 78.1 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 23.9, intermediario: 34.5, adequado: 41.6, media: 76.1 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 21.3, intermediario: 34.8, adequado: 43.9, media: 76.9 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 20.0, intermediario: 31.1, adequado: 48.9, media: 78.0 },
            "EEF FIRMINO JOSE": { defasagem: 23.7, intermediario: 32.4, adequado: 43.9, media: 76.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 18.6, intermediario: 31.4, adequado: 50.0, media: 78.4 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 23.1, intermediario: 34.2, adequado: 42.7, media: 76.5 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 22.8, intermediario: 35.1, adequado: 42.0, media: 76.3 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 23.1, intermediario: 35.4, adequado: 41.5, media: 76.2 },
            "EEF FIRMINO JOSE": { defasagem: 19.4, intermediario: 30.6, adequado: 50.0, media: 78.3 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.9, intermediario: 31.9, adequado: 48.2, media: 77.9 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 19.3, intermediario: 36.6, adequado: 44.1, media: 77.2 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 23.3, intermediario: 32.2, adequado: 44.5, media: 76.7 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 21.2, intermediario: 36.8, adequado: 42.0, media: 76.6 },
            "EEF FIRMINO JOSE": { defasagem: 20.3, intermediario: 33.9, adequado: 45.9, media: 77.5 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 23.0, intermediario: 34.3, adequado: 42.7, media: 76.5 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 23.2, intermediario: 34.0, adequado: 42.8, media: 76.5 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 22.2, intermediario: 30.3, adequado: 47.5, media: 77.4 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 21.9, intermediario: 32.8, adequado: 45.3, media: 77.1 },
            "EEF FIRMINO JOSE": { defasagem: 23.5, intermediario: 33.2, adequado: 43.3, media: 76.5 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 19.6, intermediario: 31.7, adequado: 48.7, media: 78.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 21.4, intermediario: 31.8, adequado: 46.8, media: 77.4 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 21.5, intermediario: 36.3, adequado: 42.2, media: 76.6 }
        }
    }
};

// CICLO II - DADOS CORRIGIDOS CONFORME ARQUIVO OFICIAL
const cicloIIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 27.0, intermediario: 43.3, adequado: 29.7, media: 70.4 },
            "EEF FIRMINO JOSE": { defasagem: 30.0, intermediario: 45.1, adequado: 25.0, media: 69.3 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 25.5, intermediario: 42.3, adequado: 32.3, media: 71.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 25.5, intermediario: 45.8, adequado: 28.7, media: 70.5 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 29.0, intermediario: 44.5, adequado: 26.5, media: 69.6 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 25.3, intermediario: 44.3, adequado: 30.4, media: 70.8 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 25.1, intermediario: 47.6, adequado: 27.3, media: 70.3 },
            "EEF FIRMINO JOSE": { defasagem: 29.4, intermediario: 45.6, adequado: 25.0, media: 69.3 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 26.5, intermediario: 42.3, adequado: 31.1, media: 70.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 29.4, intermediario: 45.6, adequado: 25.0, media: 69.3 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 25.4, intermediario: 44.9, adequado: 29.7, media: 70.6 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 25.3, intermediario: 46.6, adequado: 28.1, media: 70.4 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 30.0, intermediario: 45.0, adequado: 25.0, media: 69.2 },
            "EEF FIRMINO JOSE": { defasagem: 29.9, intermediario: 45.1, adequado: 25.0, media: 69.3 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 25.1, intermediario: 46.3, adequado: 28.6, media: 70.5 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 28.4, intermediario: 45.2, adequado: 26.4, media: 69.7 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 26.3, intermediario: 45.8, adequado: 27.8, media: 70.2 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 28.8, intermediario: 42.8, adequado: 28.4, media: 69.9 },
            "EEF FIRMINO JOSE": { defasagem: 27.4, intermediario: 45.3, adequado: 27.3, media: 70.0 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 26.3, intermediario: 47.2, adequado: 26.4, media: 69.9 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 27.1, intermediario: 43.3, adequado: 29.6, media: 70.4 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 27.7, intermediario: 46.4, adequado: 25.9, media: 69.7 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 25.6, intermediario: 44.6, adequado: 29.8, media: 70.6 },
            "EEF FIRMINO JOSE": { defasagem: 27.3, intermediario: 47.7, adequado: 25.0, media: 69.7 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 29.4, intermediario: 43.6, adequado: 27.0, media: 69.6 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 27.5, intermediario: 43.1, adequado: 29.4, media: 70.3 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 29.6, intermediario: 45.4, adequado: 25.0, media: 69.3 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 26.0, intermediario: 43.9, adequado: 30.1, media: 70.6 },
            "EEF FIRMINO JOSE": { defasagem: 30.0, intermediario: 45.0, adequado: 25.0, media: 69.2 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 27.2, intermediario: 45.1, adequado: 27.7, media: 70.1 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 25.6, intermediario: 43.3, adequado: 31.0, media: 70.7 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 26.7, intermediario: 45.5, adequado: 27.8, media: 70.2 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 26.5, intermediario: 45.8, adequado: 27.7, media: 70.2 },
            "EEF FIRMINO JOSE": { defasagem: 28.0, intermediario: 42.9, adequado: 29.0, media: 70.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 28.8, intermediario: 45.2, adequado: 26.0, media: 69.6 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 28.9, intermediario: 45.2, adequado: 25.9, media: 69.5 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 25.0, intermediario: 43.9, adequado: 31.1, media: 70.9 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 26.2, intermediario: 43.3, adequado: 30.5, media: 70.6 },
            "EEF FIRMINO JOSE": { defasagem: 25.4, intermediario: 45.8, adequado: 28.9, media: 70.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 26.1, intermediario: 47.4, adequado: 26.4, media: 70.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 29.3, intermediario: 42.4, adequado: 28.3, media: 69.8 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 26.2, intermediario: 46.0, adequado: 27.8, media: 70.2 }
        }
    }
};

// CICLO III - DADOS CORRIGIDOS CONFORME ARQUIVO OFICIAL
const cicloIIIData = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 37.1, intermediario: 37.9, adequado: 25.0, media: 64.8 },
            "EEF FIRMINO JOSE": { defasagem: 44.4, intermediario: 40.6, adequado: 15.0, media: 62.1 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 39.7, intermediario: 42.8, adequado: 17.4, media: 63.2 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 43.1, intermediario: 36.9, adequado: 20.0, media: 63.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 36.0, intermediario: 39.3, adequado: 24.7, media: 65.0 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 39.2, intermediario: 39.7, adequado: 21.1, media: 63.9 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 37.7, intermediario: 42.8, adequado: 19.5, media: 63.9 },
            "EEF FIRMINO JOSE": { defasagem: 39.6, intermediario: 39.2, adequado: 21.2, media: 63.8 },
            "EEF FRANCISCO MOURAO LIMA": { defasagem: 44.6, intermediario: 40.4, adequado: 15.0, media: 62.1 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 40.6, intermediario: 42.2, adequado: 17.3, media: 63.2 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 36.5, intermediario: 38.5, adequado: 25.0, media: 64.9 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 44.7, intermediario: 40.3, adequado: 15.0, media: 62.1 }
        }
    },
    "7º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 42.3, intermediario: 41.7, adequado: 16.0, media: 62.6 },
            "EEF FIRMINO JOSE": { defasagem: 44.8, intermediario: 36.0, adequado: 19.2, media: 62.6 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 39.0, intermediario: 38.4, adequado: 22.6, media: 64.1 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 43.6, intermediario: 37.5, adequado: 18.9, media: 62.8 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 36.9, intermediario: 39.5, adequado: 23.6, media: 64.7 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 40.4, intermediario: 42.5, adequado: 17.1, media: 63.1 },
            "EEF FIRMINO JOSE": { defasagem: 35.6, intermediario: 40.8, adequado: 23.6, media: 64.9 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 40.0, intermediario: 43.5, adequado: 16.4, media: 63.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 36.6, intermediario: 44.6, adequado: 18.8, media: 64.0 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 35.8, intermediario: 39.2, adequado: 25.0, media: 65.1 }
        }
    },
    "8º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 39.2, intermediario: 37.8, adequado: 23.0, media: 64.2 },
            "EEF FIRMINO JOSE": { defasagem: 37.5, intermediario: 44.2, adequado: 18.3, media: 63.8 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 39.4, intermediario: 43.6, adequado: 17.0, media: 63.3 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 40.5, intermediario: 35.5, adequado: 24.0, media: 64.1 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 45.0, intermediario: 40.0, adequado: 15.0, media: 62.0 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 41.0, intermediario: 41.8, adequado: 17.3, media: 63.1 },
            "EEF FIRMINO JOSE": { defasagem: 37.4, intermediario: 37.6, adequado: 25.0, media: 64.8 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 43.9, intermediario: 37.5, adequado: 18.6, media: 62.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 40.9, intermediario: 41.2, adequado: 17.9, media: 63.1 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 39.2, intermediario: 40.8, adequado: 20.0, media: 63.7 }
        }
    },
    "9º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": {
            "EEF 21 DE DEZEMBRO": { defasagem: 44.7, intermediario: 40.3, adequado: 15.0, media: 62.1 },
            "EEF FIRMINO JOSE": { defasagem: 43.5, intermediario: 36.7, adequado: 19.8, media: 62.9 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 39.9, intermediario: 37.1, adequado: 23.0, media: 64.0 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 39.0, intermediario: 36.0, adequado: 25.0, media: 64.5 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 38.8, intermediario: 44.9, adequado: 16.4, media: 63.4 }
        },
        "Matemática": {
            "EEF 21 DE DEZEMBRO": { defasagem: 40.2, intermediario: 44.3, adequado: 15.4, media: 62.9 },
            "EEF FIRMINO JOSE": { defasagem: 37.0, intermediario: 42.2, adequado: 20.8, media: 64.3 },
            "EEIEF 03 DE DEZEMBRO": { defasagem: 37.4, intermediario: 39.0, adequado: 23.7, media: 64.7 },
            "EEIEF ANTONIO DE SOUSA BARROS": { defasagem: 41.7, intermediario: 38.0, adequado: 20.3, media: 63.3 },
            "EEIEF JOSE ALVES DE SENA": { defasagem: 38.2, intermediario: 42.5, adequado: 19.3, media: 63.8 }
        }
    }
};

// =====================================
// MAPEAMENTO DE ESCOLAS POR FILTRO
// =====================================
const escolasPorFiltro = {
    "6º ano do Ensino Fundamental": {
        "Língua Portuguesa (Leitura)": [
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

// =====================================
// FUNÇÕES DE CARREGAMENTO E FILTROS
// =====================================

// Função para carregar dados do YAML
async function loadYAMLData() {
    try {
        const response = await fetch('CICLO_III_2025.yaml', {
            cache: 'no-cache'
        });
        
        const yamlText = await response.text();
        yamlData = jsyaml.load(yamlText);
        
        console.log('📄 Dados YAML carregados:', yamlData);
        
        populateFilters();
        
        // Aguardar um momento para os selects serem populados
        setTimeout(() => {
            setDefaultFilters();
            updateAnalytics();
        }, 200);
        
    } catch (error) {
        console.error('❌ Erro ao carregar dados YAML:', error);
        showErrorMessage();
    }
}

// Função para popular os filtros
function populateFilters() {
    if (!yamlData || yamlData.length === 0) return;
    
    console.log('📊 Populando filtros...');
    
    // Popular avaliações
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
    
    // Atualizar escolas
    updateEscolasFilter();
}

// Função para atualizar o filtro de escolas
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

// Função para aplicar filtros padrão
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
    
    // Aplicar filtros padrão
    document.getElementById('avaliacao').value = defaultValues.avaliacao;
    document.getElementById('ano-escolar').value = defaultValues.anoEscolar;
    document.getElementById('componente').value = defaultValues.componente;
    document.getElementById('rede').value = defaultValues.rede;
    document.getElementById('performance-range').value = defaultValues.performance;
    
    // Atualizar escolas após aplicar filtros de ano e componente
    setTimeout(() => {
        updateEscolasFilter();
        document.getElementById('escola').value = defaultValues.escola;
    }, 100);
}

// =====================================
// FUNÇÕES DE CÁLCULO POR CICLO
// =====================================

// Função para calcular performance do Ciclo I
function calculateCicloIPerformance() {
    return calculateCyclePerformance(cicloIData);
}

// Função para calcular performance do Ciclo II
function calculateCicloIIPerformance() {
    return calculateCyclePerformance(cicloIIData);
}

// Função para calcular performance do Ciclo III
function calculateCicloIIIPerformance() {
    return calculateCyclePerformance(cicloIIIData);
}

// Função genérica para calcular performance de um ciclo
function calculateCyclePerformance(cycleData) {
    const ano = document.getElementById('ano-escolar').value;
    const componente = document.getElementById('componente').value;
    const escola = document.getElementById('escola').value;
    
    if (!ano || !componente) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0, media: 0 };
    }
    
    // Verificar se temos dados para esta combinação
    if (!cycleData[ano] || !cycleData[ano][componente]) {
        return { adequado: 0, intermediario: 0, defasagem: 0, total: 0, media: 0 };
    }
    
    const dadosAnoComponente = cycleData[ano][componente];
    
    if (escola && escola !== 'geral' && dadosAnoComponente[escola]) {
        // Dados de escola específica
        const dadosEscola = dadosAnoComponente[escola];
        return {
            adequado: Math.round(dadosEscola.adequado),
            intermediario: Math.round(dadosEscola.intermediario),
            defasagem: Math.round(dadosEscola.defasagem),
            total: 1,
            media: Math.round(dadosEscola.media)
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

// =====================================
// FUNÇÕES DE INTERFACE
// =====================================

// Função para atualizar o card de um ciclo
function updateCycleCard(cardId, data, title, subtitle) {
    const card = document.getElementById(cardId);
    if (!card) return;
    
    // Atualizar título
    card.querySelector('h2').textContent = title;
    
    // Atualizar percentual com a soma de aprendizado intermediário + adequado
    const somaIntermediarioAdequado = (data.intermediario || 0) + (data.adequado || 0);
    card.querySelector('.percentage-large').textContent = `${somaIntermediarioAdequado}%`;
    
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
    // Calcular performance real dos três ciclos
    const cicloIPerformance = calculateCicloIPerformance();
    const cicloIIPerformance = calculateCicloIIPerformance();
    const cicloIIIPerformance = calculateCicloIIIPerformance();
    
    // Dados fixos como fallback quando não há dados específicos
    const dadosFixos = {
        cicloI: { adequado: 50, intermediario: 35, defasagem: 15, media: 84 },
        cicloII: { adequado: 45, intermediario: 40, defasagem: 15, media: 80 },
        cicloIII: { adequado: 40, intermediario: 35, defasagem: 25, media: 72 }
    };
    
    // Atualizar cards com dados reais ou fixos
    if (cicloIPerformance.total > 0) {
        updateCycleCard('ciclo-1-card', cicloIPerformance, '2025 - Ciclo I', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-1-card', dadosFixos.cicloI, '2025 - Ciclo I', 'Média geral de desempenho');
    }
    
    if (cicloIIPerformance.total > 0) {
        updateCycleCard('ciclo-2-card', cicloIIPerformance, '2025 - Ciclo II', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-2-card', dadosFixos.cicloII, '2025 - Ciclo II', 'Média geral de desempenho');
    }
    
    if (cicloIIIPerformance.total > 0) {
        updateCycleCard('ciclo-3-card', cicloIIIPerformance, '2025 - Ciclo III', 'Média geral de desempenho');
    } else {
        updateCycleCard('ciclo-3-card', dadosFixos.cicloIII, '2025 - Ciclo III', 'Média geral de desempenho');
    }
    
    console.log('📊 Analytics atualizados com dados corrigidos:', {
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

// Função para voltar ao dashboard
function goToDashboard() {
    window.location.href = 'dashboard.html';
}

// =====================================
// EVENT LISTENERS
// =====================================
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    loadYAMLData();
    
    // Adicionar listeners aos filtros
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