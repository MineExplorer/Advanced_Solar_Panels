class SolarHelmetComponent {
    readonly genDay: number;
    readonly genNight: number;

    constructor(props: {genDay: number, genNight: number}) {
        this.genDay = props.genDay;
        this.genNight = props.genNight;
    }

    /**
     * Charges armor on tick.
     * @param item helmet armor slot
     * @param playerUid player numeric id
     */
    onTick(item: ItemInstance, playerUid: number): void {
        const tickInterval = 20;
        if (World.getThreadTime() % tickInterval != 0) return;
        
        const region = WorldRegion.getForActor(playerUid);
        const pos = Entity.getPosition(playerUid);
        if (!region.canSeeSky(pos)) return;

        let energy = this.getEnergyOutput(region, pos) * tickInterval;
        for (let i = 0; i < 4; i++) {
            const armor = (i == 0) ? item : Entity.getArmorSlot(playerUid, i);
            const energyAdd = ChargeItemRegistry.addEnergyTo(armor, "Eu", energy, 4);
            if (energyAdd > 0) {
                energy -= energyAdd;
                Entity.setArmorSlot(playerUid, i, armor.id, 1, armor.data, armor.extra);
                if (energy <= 0) break;
            }
        }
    }

    private getEnergyOutput(region: WorldRegion, pos: Vector): number {
        const time = World.getWorldTime() % 24000;
        if ((time >= 23500 || time < 12550) && (!World.getWeather().rain || region.getLightLevel(pos) > 14)) {
            return this.genDay;
        }
        return this.genNight;
    }
}