"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentToImage = exports.generateRandomString = exports.escapeRegex = void 0;
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
exports.escapeRegex = escapeRegex;
function generateRandomString() {
    return (Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)).slice(0, 20);
}
exports.generateRandomString = generateRandomString;
exports.departmentToImage = {
    ANT: "/ant.jpg",
    AST: "/ast.jpg",
    BIO: "/bio.jpg",
    CCT: "/cct.jpg",
    CSC: "/csc.jpg",
    CHM: "/chm.jpg",
    CIN: "/cin.jpg",
    CLA: "/cla.jpg",
    ECO: "/eco.jpg",
    ENG: "/eng.jpg",
    ENV: "/env.jpg",
    FSC: "/fsc.jpg",
    GGR: "/ggr.jpg",
    HIS: "/his.jpg",
    HSC: "/hsc.jpg",
    ITA: "/ita.jpg",
    MAT: "/mat.jpg",
    MGD: "/mgd.jpg",
    POL: "/pol.jpg",
    PSY: "/psy.jpg",
    RLG: "/rlg.jpg",
    SOC: "/soc.jpg",
    STA: "/sta.jpg",
    WGS: "/wgs.jpg",
    WRI: "/wri.jpg",
    Community: "/community.jpg",
};
//# sourceMappingURL=index.js.map