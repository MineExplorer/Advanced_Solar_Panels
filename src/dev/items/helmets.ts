/// <reference path="AdvSolarHelmet.ts" />
/// <reference path="HybridSolarHelmet.ts" />
/// <reference path="UltimateSolarHelmet.ts" />

ItemRegistry.registerItem(new AdvSolarHelmet());
ItemRegistry.registerItem(new HybridSolarHelmet());
ItemRegistry.registerItem(new UltimateSolarHelmet());

Callback.addCallback("PreLoaded", function() {
    Recipes.addShaped({id: ItemID.advSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.advSolarHelmet)}, [
        "asa",
        "chc"
    ], ['s', BlockID.ASP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.nanoHelmet, -1, 'c', ItemID.cableGold2, 0], ChargeItemRegistry.transferEnergy);

    Recipes.addShaped({id: ItemID.quantumHelmet, count: 1, data: Item.getMaxDamage(ItemID.quantumHelmet)}, [
        "a#a",
        "bxb",
        "cqc"
    ], ['#', ItemID.storageLapotronCrystal, -1, 'x', ItemID.advSolarHelmet, -1, 'q', ItemID.hazmatHelmet, 0, 'a', ItemID.plateReinforcedIridium, 0, 'b', BlockID.reinforcedGlass, 0, 'c', ItemID.circuitAdvanced, 0], ChargeItemRegistry.transferEnergy);

    Recipes.addShaped({id: ItemID.hybridSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.hybridSolarHelmet)}, [
    	"asa",
    	"chc"
    ], ['s', BlockID.HSP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transferEnergy);

    Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
    	"asa",
    	"chc"
    ], ['s', BlockID.USP, 0, 'a', ItemID.circuitAdvanced, 0, 'h', ItemID.quantumHelmet, -1, 'c', ItemID.cableOptic, 0], ICore.ChargeRegistry.transferEnergy);

    Recipes.addShaped({id: ItemID.ultimateSolarHelmet, count: 1, data: Item.getMaxDamage(ItemID.ultimateSolarHelmet)}, [
    	"s",
    	"h"
    ], ['s', BlockID.USP, 0, 'h', ItemID.hybridSolarHelmet, -1], ICore.ChargeRegistry.transferEnergy);
});