"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = __importDefault(require("./generator"));
var fs_1 = __importDefault(require("fs"));
var template_1 = __importDefault(require("./utils/template"));
var config = {
    nameMaxWidth: template_1.default.nameMaxWidth,
    template: template_1.default.template,
    loc: {
        portraitScale: [template_1.default.portrait_scale.x, template_1.default.portrait_scale.y],
        portrait: [template_1.default.loc.portrait.x, template_1.default.loc.portrait.y],
        district: [template_1.default.loc.district.x, template_1.default.loc.district.y],
        name: [template_1.default.loc.name.x, template_1.default.loc.name.y],
        voting: [template_1.default.loc.voting.x, template_1.default.loc.voting.y],
        donation: [template_1.default.loc.donation.x, template_1.default.loc.donation.y],
        rhetoric: [template_1.default.loc.rhetoric.x, template_1.default.loc.rhetoric.y],
        updated: [template_1.default.loc.updated["-x"], template_1.default.loc.updated.y],
    },
    fonts: {
        large: template_1.default.fonts.large.file,
        medium: template_1.default.fonts.medium.file,
        small: template_1.default.fonts.small.file,
        xsmall: template_1.default.fonts.xsmall.file
    }
};
var generator = new generator_1.default(config);
exports.default = generator;
function main() {
    var data = {
        imgLink: "http://leg.colorado.gov/sites/default/files/styles/width_300/public/2019a_arndt%2C%20jeni.jpg?itok=x-tF-KT0",
        title: "SENATOR",
        district: 1,
        updatedAt: new Date(Date.now()),
        session: 72,
        name: "Joe Shmoe fen asi n fe dnfe e f ",
        grades: {
            voting: "A",
            rhetoric: "B",
            donation: "C"
        }
    };
    setTimeout(function () {
        generator.makeReportCard(data)
            .then(function (buffer) {
            fs_1.default.createWriteStream("test.jpeg").write(buffer);
            console.log(buffer);
        });
    }, 2000);
}
