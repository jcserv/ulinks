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
    ANT: "https://images.unsplash.com/flagged/photo-1552863473-6e5ffe5e052f",
    AST: "https://images.unsplash.com/photo-1464802686167-b939a6910659",
    BIO: "https://images.unsplash.com/photo-1415201179613-bd037ff5eb29",
    HSC: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
    CCT: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    CSC: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    CHM: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    CIN: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    CLA: "https://images.unsplash.com/photo-1614188045506-2f275a78c18e",
    ECO: "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d",
    ENG: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    ENV: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
    FSC: "https://images.unsplash.com/photo-1611330500121-d9439ddc3d9d",
    GGR: "https://images.unsplash.com/photo-1581922813291-c6d23508c2c4",
    HIS: "https://images.unsplash.com/photo-1505664194779-8beaceb93744",
    ITA: "https://images.unsplash.com/photo-1499602211854-122b55ef8f5d",
    MAT: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    MGD: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    POL: "https://images.unsplash.com/photo-1575320181282-9afab399332c",
    PSY: "https://images.unsplash.com/photo-1573511860302-28c524319d2a",
    RLG: "https://images.unsplash.com/photo-1601921209216-60811afbc245",
    SOC: "https://images.unsplash.com/photo-1620062103449-af4befa55284",
    STA: "https://images.unsplash.com/photo-1605870445919-838d190e8e1b",
    WGS: "https://images.unsplash.com/photo-1576570734316-e9d0317d7384",
    WRI: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
    Community: "https://images.unsplash.com/photo-1601859057596-f0c49e395b77",
};
//# sourceMappingURL=index.js.map