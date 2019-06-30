export interface IContext {
    measureText(text: string): {
        width: number;
    };
    fillText(text: string, x: number, y: number, ...argv: any[]): any;
}
export interface IArea {
    width: number;
    height: number;
}
export declare function text_split(text: string): string[];
export interface IWarpTextOptions {
    x: number;
    y: number;
    maxWidth?: number;
    lineHeight?: number;
    fontSize?: number;
    minSize?: number;
    tabSize?: number;
    letterSpacing?: number;
    area?: IArea;
}
export interface IWarpTextReturn {
    fontSize: number;
    lineHeight: number;
    minSize: number;
    letterSpacing: number;
    max_width: number;
    max_height: number;
    lines: string[][];
}
export declare function wrapText(context: IContext, text: string, { x, y, maxWidth, lineHeight, fontSize, minSize, letterSpacing, tabSize, area, }: IWarpTextOptions): IWarpTextReturn;
export default wrapText;
