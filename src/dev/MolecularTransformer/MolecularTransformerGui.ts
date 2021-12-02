const guiMolecularTransformer = new UI.StandartWindow({
	standard: {
		header: {text: {text: Translation.translate("Molecular Transformer")}},
		inventory: {standard: true},
		background: {color: Color.parseColor("#8cc8fa")}
	},

	params: {
        slot: "molecular_slot"
	},

	drawing: [
		{type: "bitmap", x: 345, y: 92, bitmap: "molecular_background", scale: GUI_SCALE},
	],

	elements: {
		"progressScale": {type: "scale", x: 390, y: 181, direction: 3, bitmap: "molecular_bar", scale: GUI_SCALE, clicker: {
			onClick: () => {
				RV?.RecipeTypeRegistry.openRecipePage("asp_molecular_transformer");
			}
		}},
		"slot1": {type: "slot", x: 374, y: 108, size: 64},
		"slot2": {type: "slot", x: 374, y: 239, size: 64},
		"textInput": {type: "text", x: 520, y: 130, text: ""},
		"textOutput": {type: "text", x: 520, y: 170, text: ""},
		"textEnergy": {type: "text", x: 520, y: 210, text: ""},
		"textProgress": {type: "text", x: 520, y: 250, text: ""},
	}
});