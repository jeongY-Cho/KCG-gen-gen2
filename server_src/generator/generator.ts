import Jimp from "jimp"


export interface IConfig {
  nameMaxWidth: number,
  template: string,

  loc: {
    portrait: [number, number],
    district: [number, number],
    name: [number, number],
    voting: [number, number],
    rhetoric: [number, number],
    donation: [number, number],
    updated: [number, number],
    portraitScale: [number, number]
  },

  fonts: {
    large: string,
    medium: string,
    small: string,
    xsmall: string
  }
}

export interface IReportCardData {
  session: number;
  imgLink: string,
  title: string,
  updatedAt: string,
  name: string,
  district: number,
  grades: {
    voting: string,
    rhetoric: string,
    donation: string
  }
}

interface IFonts {
  large: Font
  medium: Font
  small: Font
  xsmall: Font
}

export default class Generator {
  config: IConfig
  fonts: IFonts

  constructor(config: IConfig) {
    this.config = config
    // @ts-ignore
    this.fonts = {}

    Jimp.loadFont(config.fonts.large)
      .then((font) => {
        this.fonts.large = font
      })
    Jimp.loadFont(config.fonts.medium)
      .then((font) => {
        this.fonts.medium = font
      })
    Jimp.loadFont(config.fonts.small)
      .then((font) => {
        this.fonts.small = font
      })
    Jimp.loadFont(config.fonts.xsmall)
      .then((font) => {
        this.fonts.xsmall = font
      })
  }

  public async makeReportCard(data: IReportCardData) {
    let portrait = await Jimp.read(data.imgLink)
    let template = await Jimp.read(this.config.template)

    let scaledPortrait = portrait.cover(this.config.loc.portraitScale[0], this.config.loc.portraitScale[1])
    // @ts-ignore
    let reportCard = template.composite(scaledPortrait, this.config.loc.portrait[0], this.config.loc.portrait[1], { mode: Jimp.BLEND_DESTINATION_OVER })
    // @ts-ignore
    let cardWithText = this.printText(reportCard, data)
    let bufferedCard = await cardWithText.getBufferAsync(Jimp.MIME_JPEG)
    return bufferedCard
  }

  private printText(templateObj: Jimp, data: IReportCardData) {
    let date = new Date(Date.now())

    let strfdate = date.toLocaleString('en-US', {
      year: "numeric",
      month: "long",
    })

    let updatedStr = `Updated: ${strfdate}`
    let d = Jimp.measureText(this.fonts.xsmall, updatedStr)

    let districtStr: string
    switch (data.title) {
      case "REPRESENTATIVE": {
        districtStr = "House District " + data.district
        break
      }
      case "SENATOR": {
        districtStr = "Senate District " + data.district
        break
      }
    }

    return templateObj
      .print(this.fonts.medium, this.config.loc.name[0], this.config.loc.name[1], data.name, this.config.nameMaxWidth)
      .print(this.fonts.xsmall, this.config.loc.updated[0] - d, this.config.loc.updated[1], updatedStr)
      // @ts-ignore
      .print(this.fonts.medium, this.config.loc.district[0], this.config.loc.district[1], districtStr)
      .print(this.fonts.large, this.config.loc.voting[0], this.config.loc.voting[1], data.grades.voting)
      .print(this.fonts.large, this.config.loc.rhetoric[0], this.config.loc.rhetoric[1], data.grades.rhetoric)
      .print(this.fonts.large, this.config.loc.donation[0], this.config.loc.donation[1], data.grades.donation)
  }
}



// Interface copied from jimp because jimp is stupid and doesn't export Font interface and I can't be bothered to export it myself
interface FontChar {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  xoffset: number;
  yoffset: number;
  xadvance: number;
  page: number;
  chnl: number;
}

interface FontInfo {
  face: string;
  size: number;
  bold: number;
  italic: number;
  charset: string;
  unicode: number;
  stretchH: number;
  smooth: number;
  aa: number;
  padding: [number, number, number, number];
  spacing: [number, number];
}

interface FontCommon {
  lineHeight: number;
  base: number;
  scaleW: number;
  scaleH: number;
  pages: number;
  packed: number;
  alphaChnl: number;
  redChnl: number;
  greenChnl: number;
  blueChnl: number;
}

export interface Font {
  chars: {
    [char: string]: FontChar;
  };
  kernings: {
    [firstString: string]: {
      [secondString: string]: number;
    };
  };
  pages: string[];
  common: FontCommon;
  info: FontInfo;
}