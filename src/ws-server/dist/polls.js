"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacePolls = void 0;
var Status;
(function (Status) {
    Status["active"] = "ACTIVE";
    Status["close"] = "CLOSE";
})(Status || (Status = {}));
class SpacePolls {
    constructor() {
        this.polls = new Map();
    }
    addPoll(spaceId, data) {
        if (!this.polls.has(spaceId.toString())) {
            this.polls.set(spaceId.toString(), [{
                    status: Status.active,
                    data: data
                }]);
            return {
                success: true,
                message: "Poll Added Successfully"
            };
        }
        else {
            let allPolls = this.polls.get(spaceId.toString());
            allPolls.push({
                status: Status.active,
                data: data
            });
            this.polls.set(spaceId.toString(), allPolls);
            return {
                success: true,
                message: "Poll Added Successfully"
            };
        }
    }
    updatePoll(pollId, spaceId, data) {
        const allPolls = this.polls.get(spaceId.toString());
        if (allPolls) {
            for (let i = 0; i < allPolls.length; i++) {
                if (allPolls[i].data.id == pollId) {
                    allPolls[i].data = data;
                    break;
                }
            }
            return {
                success: true,
                message: "Poll Updated Successfully"
            };
        }
        else {
            return {
                success: false,
                message: "No poll available"
            };
        }
    }
    giveActivePolls(spaceId) {
        const allPolls = this.polls.get(spaceId.toString());
        if (allPolls) {
            let activePolls = [];
            for (let i = 0; i < allPolls.length; i++) {
                if (allPolls[i].status == 'ACTIVE') {
                    activePolls.push(allPolls[i].data);
                }
            }
            return {
                success: true,
                message: "Poll Fetched SuccessFully",
                data: activePolls
            };
        }
        else {
            return {
                success: false,
                message: "No Poll Found",
                data: []
            };
        }
    }
    closePoll(spaceId, pollId) {
        const allPolls = this.polls.get(spaceId.toString());
        if (allPolls) {
            let id = -1;
            for (let i = 0; i < allPolls.length; i++) {
                if (allPolls[i].data.id == pollId) {
                    allPolls[i].status = Status.close;
                    break;
                }
            }
            return {
                success: true,
                message: "Poll Close SuccessFully",
            };
        }
        else {
            return {
                success: false,
                message: "No Poll Found",
                data: []
            };
        }
    }
}
exports.SpacePolls = SpacePolls;
