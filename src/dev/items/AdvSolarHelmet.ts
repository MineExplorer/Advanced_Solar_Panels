class AdvSolarHelmet extends ArmorNanoHelmet {
    solarPanel = new SolarHelmetComponent(ASPConfig.AdvancedSolar);

    constructor() {
        super("advSolarHelmet", "adv_solar_helmet", "adv_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        this.solarPanel.onTick(item, playerUid);
        return super.onTick(item, index, playerUid);
    }
}