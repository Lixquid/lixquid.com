// PNG files are imported as a URL to the file's location
declare module "*.png" {
    const url: string;
    export default url;
}
