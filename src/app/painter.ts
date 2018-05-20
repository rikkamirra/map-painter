export class Painter {
  tools: Object;
  tool_keys: string[];
  colors: string[];

  context: CanvasRenderingContext2D;
  mode: number;
  tool: string;
  color: string;
  penSize: number;
  random: number;
  interval: number;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  currentBrush: any;
  currentPen: Object;

  brushes: any[];
  pens: Object[];

  private isTouch: boolean;

  private MAX_SIZE: number;
  private MIN_SIZE: number;

  constructor(context: CanvasRenderingContext2D, brushes: any[], pens: any[]) {
    this.context = context;
    this.brushes = brushes;
    this.pens = pens;

    this.currentBrush = this.brushes[0];
    this.currentPen = this.pens[0];

    this.tools = { "pen": this.drawPen, "brush": this.drawBrush };
    this.tool_keys = Object.keys(this.tools);
    this.tool = "pen";

    this.penSize = 1;
    this.random = 0;
    this.interval = 20;
    this.color = 'green';

    this.startX = this.startY = this.currentX = this.currentY = 0;

    this.isTouch = false;

    this.colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


    this.MAX_SIZE = 50;
    this.MIN_SIZE = 1;
  }

  public penDown = (e): void => {
    this.isTouch = true;

    this.context.beginPath();

    this.startX = this.currentX = e.offsetX;
    this.startY = this.currentY = e.offsetY;

    this.tools[this.tool](e, false);
  }

  public penUp = (e): void => {
    this.isTouch = false;

    this.context.closePath();
  }

  public penMove = (e):void => {
    if (this.isTouch) {
      this.tools[this.tool](e, true);
    }
  }

  public drawBrush = (e, checkInterval): void => {
    if (this.currentBrush && !checkInterval || Math.abs(this.currentX - e.offsetX) > this.interval || Math.abs(this.currentY - e.offsetY) > this.interval) {
      this.currentX  = e.offsetX - this.currentBrush.height / 2 + this.getRandom(this.random);
      this.currentY = e.offsetY - this.currentBrush.width / 2 + this.getRandom(this.random);
      this.context.drawImage(this.currentBrush, this.currentX, this.currentY);
    }
  }

  public drawPen = (e, checkInterval): void => {
    if (Math.abs(e.offsetX - this.currentX) < this.random && Math.abs(e.offsetY - this.currentY) < this.random) {
      return;
    }

    this.context.strokeStyle = this.color;

    let x: number = e.offsetX + this.getRandom(this.random);
    let y: number = e.offsetY + this.getRandom(this.random);

    this.context.lineWidth = this.penSize;
    this.context.moveTo(this.currentX, this.currentY);
    this.context.lineTo(x, y);
    this.context.stroke();

    this.currentX = x;
    this.currentY = y;
  }

  public fill = (w: number, h: number): void => {
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, w, h);
  }

  public get penSizeRange(): number[] {
    let res: number[] = [];
    for (let i: number = this.MIN_SIZE; i < this.MAX_SIZE; i++) {
      res.push(i);
    }
    return res;
  }

  private getRandom(value: number): number {
    let max: number = value;
    let min: number = -value;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;;
  }
}
