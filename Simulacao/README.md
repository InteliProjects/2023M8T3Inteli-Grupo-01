**A descrição do [Modelo de Simulação](https://github.com/2023M8T3Inteli/Grupo-01/blob/main/Docs/index.md#modelo-de-simulação) encontra-se na documentação oficial localizada na pasta Docs.** <br>
<br>

O modelo de simulação propõe melhorias na arquitetura do sistema atual da Meta para alcançar uma assertividade de 95% na classificação de itens. O diagrama estático ilustra a estrutura planejada, introduzindo novos elementos e requisitos para aprimorar o sistema.

**Elementos e parâmetros de simulação:**

- Sistema Atual: Representa o estado atual do sistema de classificação de itens.
- Melhoramento da Arquitetura: Inclui mudanças na estrutura para alcançar a meta de 95% de assertividade.
- Implementação de Chatbot: Proposto para melhorar a classificação por meio de interações com usuários.
- Melhoramento do Modelo: Utilização de técnicas de aprendizado de máquina para aprimorar a precisão das classificações.
- Rastreabilidade dos Dados, Segurança e Disponibilidade: Requisitos cruciais para garantir a integridade, segurança e disponibilidade do sistema.
<br><br>

O modelo utiliza a Cadeia de Markov para simular quatro cenários distintos:
<br>
1. Simulação do Sistema Atual: Considera a assertividade atual de 65% na classificação de itens. Risco associado à manutenção da assertividade atual.
2. Sistema Novo: Simula o sistema idealizado com 95% de assertividade. Relacionado à oportunidade de melhorar a assertividade do modelo.
3. Sistema após Implementação do Chatbot: Considera uma melhora na assertividade para 70% após a implementação do chatbot.
4. Simulação do Sistema Atual Indisponível: Avalia a assertividade do sistema quando está indisponível. Destaca a importância da alta disponibilidade.
<br>

Além disso, há simulações específicas sobre a indisponibilidade do chatbot e testes de carga usando o software JMT (Java Modelling Tools) para avaliar o desempenho do sistema com uma maior capacidade de usuários.
<br><br>

**Simulação da nova arquitetura:**
<br><br>

- Baseada em microserviços, a simulação representa o sistema de supply chain da Meta, considerando a chegada e o processamento de usuários por servidores especializados.
- Métricas de Utilização, Tempo de Resposta e Vazão (Throughput) são avaliadas para verificar o desempenho do sistema.
- Resultados indicam uma utilização média de cerca de 67%, tempos de resposta consistentes em torno de 2 unidades de tempo e uma vazão próxima a 0.99 itens por unidade de tempo em todos os servidores.
- Conclusão: A arquitetura planejada para implementação mostrou bons resultados, indicando eficiência no sistema e atendimento aos requisitos de disponibilidade, tempo de resposta e desempenho.

<br>
O modelo de simulação fornece uma visão detalhada das mudanças propostas, suas implicações e a eficácia potencial dessas alterações para melhorar a precisão e a eficiência do sistema de classificação de itens da Meta.
