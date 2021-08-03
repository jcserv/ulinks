"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUSES = exports.Status = void 0;
var Status;
(function (Status) {
    Status["approved"] = "approved";
    Status["pending"] = "pending";
    Status["rejected"] = "rejected";
})(Status = exports.Status || (exports.Status = {}));
exports.STATUSES = Object.values(Status);
exports.default = { Status, STATUSES: exports.STATUSES };
//# sourceMappingURL=statuses.js.map