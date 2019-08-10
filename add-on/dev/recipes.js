Recipes.addShapeless({id: BlockID.HSP, count: 8, data: 0}, [{id: BlockID.USP, data: 0}]);

Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
], ['a', BlockID.HSP, 0, 'b', ItemID.circuitAdvanced, 0]);
 
Recipes.addShaped({id: BlockID.QSP, count: 1, data: 0}, [
 "aaa",
 "aba",
 "aaa"
], ['a', BlockID.USP, 0, 'b', ItemID.quantumCore, 0]);

if(__config__.getBool("hard_recipes")){
	if(__config__.getBool("simple_asp_recipe")){
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, -1, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', ItemID.irradiantGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.enrichedSunnarium, 0]);

	Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.enrichedSunnariumAlloy, 0]);
}
else{
	if(__config__.getBool("simple_asp_recipe")){
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', BlockID.machineBlockAdvanced, 0]);
	}else{
		Recipes.addShaped({id: BlockID.ASP, count: 1, data: 0}, [
		 "aaa", 
		 "bxb", 
		 "cdc"
		], ['x', BlockID.solarPanel, 0, 'a', BlockID.reinforcedGlass, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0, 'd', ItemID.plateIrradiantReinforced, 0]);
	}
	
	Recipes.addShaped({id: BlockID.HSP, count: 1, data: 0}, [
	 "afa",
	 "bxb",
	 "cdc"
	], ["f", 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.circuitAdvanced, 0, 'a', ItemID.carbonPlate, 0, 'd', ItemID.sunnarium, 0]);
	 
	Recipes.addShaped({id: BlockID.USP, count: 1, data: 0}, [
	 " a ", 
	 "bxb", 
	 "cbc"
	], ['a', 22, -1, 'x', BlockID.ASP, 0, 'b', ItemID.coalChunk, 0, 'c', ItemID.sunnariumAlloy, 0]);
}