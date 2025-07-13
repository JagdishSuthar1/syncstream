import { PollStreamType } from "./types"

export type PollDetailsType = {
    status : Status,
    data : PollStreamType
}


enum Status {
    active = 'ACTIVE',
    close = 'CLOSE'
}

export class SpacePolls {
    private polls : Map<string , PollDetailsType[]> = new Map()

    addPoll(spaceId : number , data : PollStreamType) {
        if(!this.polls.has(spaceId.toString())) {
            this.polls.set(spaceId.toString() , [{
                status : Status.active,
                data : data
            }])


            return {
                success : true,
                message : "Poll Added Successfully"
            }
        }

        else {
            let allPolls = this.polls.get(spaceId.toString())!
            allPolls.push({
                status : Status.active,
                data : data
            })
            this.polls.set(spaceId.toString() , allPolls)


            return {
                success : true,
                message : "Poll Added Successfully"
            }
        }
    }

    updatePoll(pollId  : number , spaceId : number, data : PollStreamType) {
        const allPolls = this.polls.get(spaceId.toString());
        
        if(allPolls) {
            for(let i = 0; i < allPolls.length ; i++) {
                if(allPolls[i].data.id == pollId) {
                    allPolls[i].data = data
                    break;
                }
            }

            return {
                success : true,
                message : "Poll Updated Successfully"
            }
        }
        else {
            return {
                success : false,
                message : "No poll available"
            }
        }
    }

    giveActivePolls(spaceId : number) {
        const allPolls = this.polls.get(spaceId.toString());
        
        if(allPolls) {
            let activePolls : PollStreamType[] = []
            for(let i = 0; i <allPolls.length ; i++) {
                if(allPolls[i].status == 'ACTIVE') {
                    activePolls.push(allPolls[i].data)
                }
            }
            return {
                success : true, 
                message : "Poll Fetched SuccessFully",
                data : activePolls
            }
        }
        else {
            return {
                success : false,
                message : "No Poll Found",
                data : []
            }
        }
    
    }

    closePoll(spaceId: number , pollId : number) {
        const allPolls = this.polls.get(spaceId.toString());
        
        if(allPolls) {
            let id = -1
            for(let i = 0; i <allPolls.length ; i++) {
                if(allPolls[i].data.id == pollId) {
                    allPolls[i].status = Status.close
                    break;
                }
            }
            
            return {
                success : true, 
                message : "Poll Close SuccessFully",
            }
        }
        else {
            return {
                success : false,
                message : "No Poll Found",
                data : []
            }
        }
    }

}