export function logarTempoDeExecucao(emSegundos = false) {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            let divisor = 1;
            let unidade = "milissegundos";
            if (emSegundos) {
                divisor = 1000;
                unidade = "segundos";
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            const tempoDeExecucao = (t2 - t1) / divisor;
            console.log(`O método ${propertyKey} levou ${tempoDeExecucao} ${unidade} para ser executado.`);
            return retorno;
        };
        return descriptor;
    };
}
