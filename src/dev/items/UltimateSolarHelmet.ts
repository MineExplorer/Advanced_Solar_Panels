class UltimateSolarHelmet extends ArmorQuantumHelmet {
    solarPanel = new SolarHelmetComponent(ASPConfig.UltimateSolar);

    constructor() {
        super("ultimateSolarHelmet", "ultimate_solar_helmet", "ultimate_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        this.solarPanel.onTick(item, playerUid);
        return super.onTick(item, index, playerUid);
    }
}