export function logarTempoDeExecucao() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            const tempoDeExecucao = (t2 - t1)/1000;
            console.log(
                `O método ${propertyKey} levou ${tempoDeExecucao} segundos para ser executado.`
            );
            return retorno;
        }
        return descriptor;
    }
}