let RV: {Core: any, RecipeType: typeof RecipeType, RecipeTypeRegistry: RecipeTypeRegistry};

ModAPI.addAPICallback("RecipeViewer", (api: typeof RV) => {

	RV = api;

	class MTRecipe extends api.RecipeType {
		constructor(){
			super("Molecular Transformer", BlockID.molecularTransformer, {
				params: {
					slot: "molecular_slot"
				},

				drawing: [
					{type: "bitmap", x: 20, y: 50, scale: 6, bitmap: "molecular_background"},
					{type: "bitmap", x: 20 + 14 * 6, y: 50 + 28 * 6, scale: 6, bitmap: "molecular_bar"}
				],

				elements: {
					"input0": {type: "slot", x: 20 + 9 * 6, y: 50 + 5 * 6, size: 120},
					"output0": {type: "slot", x: 20 + 9 * 6, y: 50 + 46 * 6, size: 120},
					"textInput": {type: "text", x: 20 + 50 * 6, y: 50 + 12 * 6, font: {size: 32, color: Color.WHITE, shadow: 0.5}},
					"textOutput": {type: "text", x: 20 + 50 * 6, y: 150 + 12 * 6, font: {size: 32, color: Color.WHITE, shadow: 0.5}},
					"textEnergy": {type: "text", x: 20 + 50 * 6, y: 250 + 12 * 6, font: {size: 32, color: Color.WHITE, shadow: 0.5}},
				}
			} as any);
		}

		getAllList(): RecipePattern[] {
			const list: RecipePattern[] = [];
			const recipe: {[key: string]: {id: number, count: number, data: number, energy: number}} = ICore.Recipe.requireRecipesFor("molecularTransformer");
			for (let key in recipe) {
				let input = key.split(":");
				let result = recipe[key];
				list.push({
					input: [{id: +input[0], count: 1, data: +input[1] || 0}],
					output: [{id: result.id, count: result.count, data: result.data}],
               		energy: result.energy
				});
			}
			return list;
		}

      	onOpen(elements: java.util.HashMap<string, UI.Element>, recipe: RecipePattern): void {
			elements.get("textInput").setBinding("text", Translation.translate("Input: ") + this.getItemName(recipe.input[0]));
			elements.get("textOutput").setBinding("text", Translation.translate("Output: ") + this.getItemName(recipe.output[0]));
			elements.get("textEnergy").setBinding("text", Translation.translate("Energy: ") + recipe.energy);
		}

		getItemName(item: {id: number, data: number}) {
			let name = Item.getName(item.id, item.data);
			if (name[0] == '§') return name.slice(2);
			return name;
		}
	}

	api.RecipeTypeRegistry.register("asp_molecular_transformer", new MTRecipe());
});