export async function promptGemini(dados) {
    const prompt = `
        Você é um analista financeiro experiente escrevendo para um jornal financeiro.
        Analise a seguinte carteira de investimentos e forneça insights profissionais.

        Carteira (JSON):
        ${JSON.stringify(dados, null, 2)}

        Estruture sua análise em seções como:
        1. **Visão Geral do Portfólio**
        2. **Destaques da Carteira**
        3. **Recomendações de Ajustes**
        4. **Perspectivas para o Próximo Período**

        Use tom jornalístico profissional em português do Brasil.
        `;

    return prompt;
}