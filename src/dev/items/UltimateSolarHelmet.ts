class UltimateSolarHelmet extends ArmorQuantumHelmet {
    constructor() {
        super("ultimateSolarHelmet", "ultimate_solar_helmet", "ultimate_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        solarHelmetTick(playerUid, USP.gen_day*20, USP.gen_night*20);
        item = Entity.getArmorSlot(playerUid, 0);
        return super.onTick(item, index, playerUid);
    }
}