class HybridSolarHelmet extends ArmorQuantumHelmet {
    solarPanel = new SolarHelmetComponent(ASPConfig.HybridSolar);

    constructor() {
        super("hybridSolarHelmet", "hybrid_solar_helmet", "hybrid_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        this.solarPanel.onTick(item, playerUid);
        return super.onTick(item, index, playerUid);
    }
}