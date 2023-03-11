type PanelProperties = {
    genDay: number;
    genNight: number;
    output: number;
    storage: number;
}

namespace ASPConfig {
    export function getInt(name: string): number{
        return __config__.getNumber(name).intValue();
    }

    export function getBool(name: string): boolean {
        return __config__.getBool(name);
    }

    function readPanelConfig(key: string): PanelProperties {
        return {
            genDay: getInt(key + ".gen_day"),
            genNight: getInt(key + ".gen_night"),
            output: getInt(key + ".output"),
            storage: getInt(key + ".storage")
        }
    }

    export const AdvancedSolar = readPanelConfig("advanced_solar_panel");
    export const HybridSolar = readPanelConfig("hybrid_solar_panel");
    export const UltimateSolar = readPanelConfig("ultimate_solar_panel");
    export const QuantumSolar = readPanelConfig("quantum_solar_panel");
}
