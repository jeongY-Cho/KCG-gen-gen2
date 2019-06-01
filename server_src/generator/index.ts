import Generator, { IConfig, IReportCardData } from "./generator"
import fs from "fs"

import template from "./utils/template"


let config: IConfig = {
  nameMaxWidth: template.nameMaxWidth,
  template: template.template,
  loc: {
    portraitScale: [template.portrait_scale.x, template.portrait_scale.y],
    portrait: [template.loc.portrait.x, template.loc.portrait.y],
    district: [template.loc.district.x, template.loc.district.y],
    name: [template.loc.name.x, template.loc.name.y],
    voting: [template.loc.voting.x, template.loc.voting.y],
    donation: [template.loc.donation.x, template.loc.donation.y],
    rhetoric: [template.loc.rhetoric.x, template.loc.rhetoric.y],
    updated: [template.loc.updated["-x"], template.loc.updated.y],
  },
  fonts: {
    large: template.fonts.large.file,
    medium: template.fonts.medium.file,
    small: template.fonts.small.file,
    xsmall: template.fonts.xsmall.file
  }
}

const generator = new Generator(config)

export default generator

function main() {

  let data: IReportCardData = {
    imgLink: "http://leg.colorado.gov/sites/default/files/styles/width_300/public/2019a_arndt%2C%20jeni.jpg?itok=x-tF-KT0",
    title: "SENATOR",
    district: 1,
    updatedAt: String(Date.now()),
    session: 72,
    name: "Joe Shmoe fen asi n fe dnfe e f ",
    grades: {
      voting: "A",
      rhetoric: "B",
      donation: "C"
    }
  }
  setTimeout(() => {

    generator.makeReportCard(data)
      .then((buffer) => {
        fs.createWriteStream("test.jpeg").write(buffer)
        console.log(buffer);

      })
  }, 2000);
}