export interface IContext
{

	measureText(text: string): {
		width: number,
	};

	fillText(text: string, x: number, y: number, ...argv: any[]): any;

}

export interface IArea
{
	width: number,
	height: number,
}

export function text_split(text: string): string[]
{
	return text
		.replace(/\r\n|\r/ug, '\n')
		.split(/(\n|\s|.)/iu)
		.filter(s => s !== '')
		;
}

export interface IWarpTextOptions
{
	x: number,
	y: number,
	maxWidth?: number,
	lineHeight?: number,
	fontSize?: number,
	minSize?: number,
	tabSize?: number,

	letterSpacing?: number,

	area?: IArea,
}

export interface IWarpTextReturn
{
	fontSize: number,
	lineHeight: number,
	minSize: number,
	letterSpacing: number,
	max_width: number,
	max_height: number,
	lines: string[][],
}

export function wrapText(context: IContext, text: string, {
	x,
	y,
	maxWidth,
	lineHeight,
	fontSize,
	minSize,
	letterSpacing,
	tabSize,
	area,
}: IWarpTextOptions): IWarpTextReturn
{
	let xx = x;

	fontSize = Math.ceil(Math.max(context.measureText('國').width / 2, (fontSize | 0) / 2)) * 2;
	lineHeight = Math.ceil(lineHeight | 0) || fontSize * 1.6;

	if (minSize == null)
	{
		minSize = fontSize;
	}

	minSize = (minSize | 0) || Math.ceil(Math.max(fontSize / 2, minSize | 0));

	letterSpacing |= 0;

	tabSize = tabSize | 0 || 2;

	let lines: string[][] = [];

	let max_width = 0;

	let line = text_split(text)
		.reduce((line, char) =>
		{
			let _do = false;
			let w = 0;

			if (char === '\n')
			{
				_do = true;
				char = '';
			}
			else if (char !== '')
			{
				let width = context.measureText(char).width;

				if (!width && char === '\t')
				{
					width = fontSize * tabSize;
				}

				if (width < 1)
				{
					/*
					console.dir({
						char,
						width,
					});
					 */

					return line;
				}

				w = Math.ceil(Math.max(width, minSize));

				let x2 = xx + Math.max(w, minSize);

				if (x2 > maxWidth)
				{
					_do = true;
				}
			}

			if (_do)
			{
				max_width = Math.max(max_width, xx + w);

				xx = x;
				y += lineHeight;

				lines.push(line);
				line = [];
			}

			if (char !== '')
			{
				context.fillText(char, xx, y);
				xx += w + letterSpacing;

				line.push(char);
			}

			return line;
		}, [] as string[])
	;

	if (line.length)
	{
		lines.push(line);
		line = undefined;
	}

	const max_height = y + lineHeight;

	const ret: IWarpTextReturn = {
		fontSize,
		lineHeight,
		minSize,
		letterSpacing,
		max_width,
		max_height,
		lines,
	};

	//console.dir(ret);

	return ret;
}

export default wrapText
