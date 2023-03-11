/// <reference path="./TileEntityQuantumGenerator.ts" />

BlockRegistry.createBlock("quantumGenerator", [
    {name: "quantum_generator", texture: [["quantum_generator", 0]], inCreative: true}
], "machine");
ItemRegistry.setRarity(BlockID.quantumGenerator, EnumRarity.EPIC);

ICore.Render.setStandardModel(BlockID.quantumGenerator, 0, [["quantum_generator", 0]]);
ICore.Render.registerRenderModel(BlockID.quantumGenerator, 0, [["quantum_generator", 1]]);

ICore.Machine.registerPrototype(BlockID.quantumGenerator, new TileEntityQuantumGenerator());