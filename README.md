# 📊 Dashboard - Avaliação Contínua da Aprendizagem

Dashboard interativo para visualização e análise de dados educacionais do Ciclo III / 2025, com foco em percentuais de acerto por habilidade em diferentes escolas da rede pública.

## 🎯 Funcionalidades Principais

### 📈 Visualização de Dados
- **Cards coloridos** por nível de desempenho (crítico, baixo, intermediário, adequado)
- **Filtros dinâmicos** por avaliação, ano escolar, componente curricular, rede e escola
- **Comparação escola vs média geral** da rede educacional
- **Modal detalhado** com informações específicas de cada habilidade

### 🔄 Atualização Automática
- **Sincronização a cada 30 segundos** para detectar mudanças nos dados
- **Notificações elegantes** quando dados são atualizados
- **Preservação automática** dos filtros selecionados após atualizações

### 🎨 Interface Moderna
- **Design glassmorphism** com efeitos de blur e transparência
- **Layout responsivo** otimizado para desktop, tablet e mobile
- **Animações suaves** e transições modernas
- **Tema educacional** com ícones e cores pedagógicas

## 🚀 Como Usar

### 1. Acesso Rápido
Ao carregar a página, filtros padrão são aplicados automaticamente:
- **📋 Avaliação:** Avaliação Contínua da Aprendizagem - Ciclo III / 2025
- **🎓 Ano:** 6º ano do Ensino Fundamental  
- **📚 Componente:** Língua Portuguesa (Leitura)
- **🏛️ Rede:** Pública
- **🏫 Escola:** Média Geral

### 2. Personalização
- Altere qualquer filtro para visualizar dados específicos
- Selecione uma escola individual para comparar com a média geral
- Use o filtro de faixa de desempenho para focar em níveis específicos

### 3. Detalhamento
- Clique em qualquer card para ver informações detalhadas
- Compare desempenho entre escolas
- Visualize diferenças percentuais escola vs rede

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com Flexbox/Grid
- **JavaScript ES6+** - Lógica interativa e manipulação de dados
- **YAML** - Formato de dados educacionais
- **Glassmorphism** - Tendência de design moderno

## 📊 Sistema de Cores

| Cor | Faixa | Significado |
|-----|--------|-------------|
| 🔴 Vermelho | ≤ 40% | Crítico - Necessita intervenção urgente |
| 🟠 Laranja | 41-60% | Baixo - Requer atenção especial |
| 🔵 Azul | 61-80% | Intermediário - Em desenvolvimento |
| 🟢 Verde | > 80% | Adequado - Meta atingida |

## 📱 Responsividade

- **Desktop:** Layout completo com sidebar e área principal
- **Tablet:** Reorganização vertical dos filtros
- **Mobile:** Interface compacta otimizada para toque

## 🔧 Instalação e Desenvolvimento

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP (para desenvolvimento local)

### Executar Localmente
```bash
# Clonar o repositório
git clone https://github.com/pauloheg33/ciclos.git

# Entrar no diretório
cd ciclos

# Iniciar servidor local (Python 3)
python -m http.server 8000

# Acessar no navegador
# http://localhost:8000/dashboard.html
```

## 📋 Estrutura do Projeto

```
ciclos/
├── dashboard.html          # Interface principal
├── styles.css             # Estilos e design
├── script.js              # Lógica e interatividade
├── CICLO_III_2025.yaml   # Dados educacionais
└── README.md              # Documentação
```

## 🎓 Contexto Educacional

Este dashboard foi desenvolvido para apoiar gestores educacionais, coordenadores pedagógicos e professores na análise de dados de aprendizagem, facilitando:

- **Identificação de habilidades** com baixo desempenho
- **Comparação entre escolas** da mesma rede
- **Monitoramento contínuo** do progresso educacional
- **Tomada de decisões** baseada em dados

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Paulo** - [@pauloheg33](https://github.com/pauloheg33)

---

📊 **Dashboard desenvolvido com foco na melhoria da qualidade educacional**