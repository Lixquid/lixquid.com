// PNG files are imported as a URL to the file's location
declare module "*.png" {
	const url: string;
	export default url;
}

// Anything with "?raw" at the end is imported as a string
declare module "*.txt?raw" {
	const content: string;
	export default content;
}
