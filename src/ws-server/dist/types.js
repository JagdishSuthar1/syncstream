"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncommingMessageType = void 0;
var IncommingMessageType;
(function (IncommingMessageType) {
    IncommingMessageType["join_space"] = "JOIN_SPACE";
    IncommingMessageType["comment"] = "COMMENT_IN_SPACE";
    IncommingMessageType["remove_user"] = "REMOVE_USER";
    IncommingMessageType["ban_user"] = "BAN_USER";
    IncommingMessageType["poll_create"] = "POLL_CREATE";
    IncommingMessageType["poll_update"] = "POLL_UPDATE";
    IncommingMessageType["get_active_polls"] = "GET_ACTIVE_POLLS";
    IncommingMessageType["close_poll"] = "CLOSE_POLL";
    IncommingMessageType["active_users"] = "GET_ACTIVE_USERS";
})(IncommingMessageType || (exports.IncommingMessageType = IncommingMessageType = {}));
