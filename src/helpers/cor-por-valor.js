export const corPorValor = (valor, tipo = 'neutro') => {
    if (tipo === 'dy' && valor > 6) return '#27ae60';
    if (tipo === 'roe' && valor > 15) return '#27ae60';
    if (tipo === 'pvp' && valor < 1) return '#27ae60';
    return '#2c3e50';
};
