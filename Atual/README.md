**A descrição da [Arquitetura do Sistema Atual](https://github.com/2023M8T3Inteli/Grupo-01/blob/main/Docs/index.md#arquitetura-do-sistema-atual) encontra-se na documentação oficial localizada na pasta Docs.** <br>

O sistema atual da META, conhecido como "BUY@", é um sistema de controle de compras que visa otimizar o processo de aquisição. Após a compra, o sistema "INVOICE" é acionado para solicitar uma nota fiscal ao fornecedor. Essa nota, junto com variáveis do sistema BUY@ e outras externas, passa por um sistema de Inteligência Artificial (IA), cujo objetivo principal é ajudar na classificação da categoria da compra dentro do sistema. Isso oferece uma gestão eficaz das notas fiscais, agilizando o processo de compra e venda entre compradores e fornecedores.

**Controle dos requisitos:**

**RNF01:** A acurácia do sistema é de 65%, mas o objetivo é atingir 95% de acurácia na classificação na região LATAM. O controle do requisito é feito comparando a classificação da IA com a correção realizada por humanos. <br><BR>
**RNF02**: Embora o sistema possua rastreabilidade, as métricas atuais não auxiliam na identificação de falhas de categorização para melhorar a assertividade. Logs de erros, desempenho de infraestrutura e classificação são armazenados separadamente, sem aproveitar os dados para insights e melhorias no modelo.
<BR><BR>
**RNF03:** Não há um sistema de segurança implementado, o que pode resultar em vazamentos de dados sensíveis e descumprimento da LGPD. A segurança desejada é de 99,995%, mas não há detalhes sobre como esse requisito é monitorado. 
<BR><br>
**RNF04:** O sistema deve ter um tempo de atividade superior a 99,9%, porém não há monitoramento de disponibilidade atualmente. 
<BR><br>
**RNF05:** A capacidade atual do sistema é de apenas 30 usuários simultâneos, o que é insuficiente para a demanda da empresa.
<br><br>

**Táticas arquiteturais:**

- A classificação da IA é corrigida manualmente na região LATAM, mas não em outras regiões, o que impacta a precisão das categorizações.
- Os logs de erros, desempenho e classificação são mantidos separadamente, dificultando a utilização eficiente desses dados para aprimorar o sistema.
- Falta criptografia e registros detalhados no fluxo de processamento, resultando em vulnerabilidades de segurança e possíveis violações da LGPD.
- Não há monitoramento de disponibilidade ou métricas de desempenho, o que pode comprometer a alta disponibilidade e a capacidade de atender à demanda de usuários.


É evidente que melhorias e investimentos são necessários para otimizar a precisão, segurança e capacidade do sistema, garantindo a conformidade com regulamentações e a eficiência nas operações da empresa.
