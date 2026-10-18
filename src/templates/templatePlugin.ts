/// <reference types="node" />
/**
 * Build-time templating into html comments with handlebars.
 */
import Handlebars from "handlebars";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

//#region Data Types
interface CardData {
	title: string;
	description: string[];
	tags: string[];
	link: string;
	source?: string;
	image: string;
	color: string;
}

interface SectionData {
	id: string;
	title: string;
	subtitle: string;
	cards: CardData[];
}

interface FriendData {
	url: string;
	image: string;
}

interface SiteData {
	cards: SectionData[];
	friends: FriendData[];
}
//#endregion

const DATA_PATH = path.resolve(process.cwd(), "src", "data.json");
const TEMPLATES_PATH = path.resolve(process.cwd(), "src", "templates");

//#region Helpers
Handlebars.registerHelper("column", (cards: CardData[], column: number) => {
	const middle = Math.ceil(cards.length / 2);
	return column === 0 ? cards.slice(0, middle) : cards.slice(middle);
});
//#endregion

//#region Templates
const TEMPLATE_FILES = readdirSync(TEMPLATES_PATH).filter((file) =>
	file.endsWith(".hbs"),
);

let sectionsTemplate: ReturnType<typeof Handlebars.compile>;
let friendsTemplate: ReturnType<typeof Handlebars.compile>;

/** Registers the partials and (re)compiles the templates. */
function loadTemplates() {
	for (const file of TEMPLATE_FILES) {
		const name = path.basename(file, ".hbs");
		const content = readFileSync(path.resolve(TEMPLATES_PATH, file), "utf-8");
		if (name === "sections" || name === "friends") {
			// Top-level templates are compiled.
			continue;
		}
		Handlebars.registerPartial(name, content);
	}
	sectionsTemplate = Handlebars.compile(
		readFileSync(path.resolve(TEMPLATES_PATH, "sections.hbs"), "utf-8"),
	);
	friendsTemplate = Handlebars.compile(
		readFileSync(path.resolve(TEMPLATES_PATH, "friends.hbs"), "utf-8"),
	);
}
loadTemplates();

function readData(): SiteData {
	return JSON.parse(readFileSync(DATA_PATH, "utf-8")) as SiteData;
}
//#endregion

export function templatePlugin(): Plugin {
	return {
		name: "template-data",
		// Rebuild on data / template changes
		buildStart() {
			this.addWatchFile(DATA_PATH);
			for (const file of TEMPLATE_FILES) {
				this.addWatchFile(path.resolve(TEMPLATES_PATH, file));
			}
		},
		transformIndexHtml: {
			order: "pre",
			handler(html) {
				const data = readData();
				return html
					.replace("<!--template:sections-->", sectionsTemplate(data))
					.replace("<!--template:friends-->", friendsTemplate(data));
			},
		},
		handleHotUpdate(ctx) {
			// If we changed data.json, rebuild the html
			if (ctx.file === DATA_PATH) {
				ctx.server.ws.send({ type: "full-reload" });
				return [];
			}
			// If we changed a template, reload the templates, then rebuild
			if (
				ctx.file.startsWith(TEMPLATES_PATH) && ctx.file.endsWith(".hbs")
			) {
				loadTemplates();
				ctx.server.ws.send({ type: "full-reload" });
				return [];
			}
			return undefined;
		},
	};
}
