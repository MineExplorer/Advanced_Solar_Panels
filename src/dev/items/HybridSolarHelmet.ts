class HybridSolarHelmet extends ArmorQuantumHelmet {
    constructor() {
        super("hybridSolarHelmet", "hybrid_solar_helmet", "hybrid_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        solarHelmetTick(playerUid, HSP.gen_day*20, HSP.gen_night*20);
        item = Entity.getArmorSlot(playerUid, 0);
        return super.onTick(item, index, playerUid);
    }
}