/// <reference path="Machine/TileEntitySolarPanel.ts" />

function createSolarPanel(stringID: string, name: string, texture: string, properties: PanelProperties, rarity: EnumRarity): void {
    let blockID = IDRegistry.genBlockID(stringID);
    Block.createBlock(stringID, [
        {name: name, texture: [[texture, 2], [texture, 1], [texture, 0], [texture, 0], [texture, 0], [texture, 0]], inCreative: true}
    ], "machine");
    ItemRegistry.setRarity(blockID, rarity)
    ICore.Machine.registerPrototype(blockID, new TileEntitySolarPanel(name, properties));
}