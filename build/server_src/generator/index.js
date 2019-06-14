"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __importDefault(require("./generator"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var template = require(path_1.join(process.cwd(), "/utils/template"));
var config = {
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
        updated: [template.loc.updated["-x"], template.loc.updated.y]
    },
    fonts: {
        large: template.fonts.large.file,
        medium: template.fonts.medium.file,
        small: template.fonts.small.file,
        xsmall: template.fonts.xsmall.file
    }
};
var generator = new generator_1.default(config);
exports.default = generator;
function main() {
    var data = {
        imgLink: "http://leg.colorado.gov/sites/default/files/styles/width_300/public/2019a_arndt%2C%20jeni.jpg?itok=x-tF-KT0",
        title: "SENATOR",
        district: 1,
        session: 72,
        name: "Joe Shmoe fen asi n fe dnfe e f ",
        grades: {
            Voting: "A",
            Rhetoric: "B",
            Donation: "C"
        }
    };
    setTimeout(function () {
        generator.makeReportCard(data).then(function (buffer) {
            fs_1.default.createWriteStream("test.jpeg").write(buffer);
            console.log(buffer);
        });
    }, 2000);
}
