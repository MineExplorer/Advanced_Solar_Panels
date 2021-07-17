namespace ConfigASP {
    export function getInt(name: string): number{
        return __config__.getNumber(name).intValue();
    }
    export function getBool(name: string): boolean {
        return __config__.getBool(name);
    }
    export function readPanelConfig(key: string): PanelProperties {
        return {
            gen_day: ConfigASP.getInt(key + ".gen_day"),
            gen_night: ConfigASP.getInt(key + ".gen_night"),
            output: ConfigASP.getInt(key + ".output"),
            storage: ConfigASP.getInt(key + ".storage")
        }
    }
}

type PanelProperties = {
    gen_day: number;
    gen_night: number;
    output: number;
    storage: number;
}

const ASP = ConfigASP.readPanelConfig("advanced_solar_panel");
const HSP = ConfigASP.readPanelConfig("hybrid_solar_panel");
const USP = ConfigASP.readPanelConfig("ultimate_solar_panel");
const QSP = ConfigASP.readPanelConfig("quantum_solar_panel");