class AdvSolarHelmet extends ArmorNanoHelmet {
    constructor() {
        super("advSolarHelmet", "adv_solar_helmet", "adv_solar_helmet")
    }

    onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
        solarHelmetTick(playerUid, ASP.gen_day*20, ASP.gen_night*20);
        item = Entity.getArmorSlot(playerUid, 0);
        return super.onTick(item, index, playerUid);
    }
}

function solarHelmetTick(playerUid: number, genDay: number, genNight: number) {
    if (World.getThreadTime() % 20 != 0) return null;
    const region = WorldRegion.getForActor(playerUid);
    const pos = Entity.getPosition(playerUid);
    const time = World.getWorldTime() % 24000;
    if (region.canSeeSky(pos)) {
        if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || region.getLightLevel(pos) > 14)) {
			var energy = genDay;
		} else {
			var energy = genNight;
		}
        if (region.canSeeSky(pos) && (!World.getWeather().rain || region.getLightLevel(pos) > 14)) {
            for (let i = 0; i < 4; i++) {
                let armor = Entity.getArmorSlot(playerUid, i);
                let energyAdd = ChargeItemRegistry.addEnergyTo(armor, "Eu", energy, 4);
                if (energyAdd > 0) {
                    energy -= energyAdd;
                    Entity.setArmorSlot(playerUid, i, armor.id, 1, armor.data, armor.extra);
                    if (energy <= 0) break;
                }
            }
        }
    }
}