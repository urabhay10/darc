const ability = (gamestate, id) => {
    let card = null;
    //checking in host
    for (let i = 0; i < gamestate.table.host.length; i++) {
        const element = gamestate.table.host[i];
        if (id === element.id) {
            //finding the card
            card = element;
            role = 'host';
            let newqueenid;
            //finding available id
            for (let j = 1; j < 100; j++) {
                const createdid = 'f' + j;
                let canuseid;
                for (let k = 0; k < gamestate.table.host.length; k++) {
                    if (createdid === gamestate.table.host[k].id) {
                        canuseid = false;
                    }
                }
                if (canuseid) {
                    newqueenid = createdid;
                }
            }
            //adding the queen
            gamestate.table.host.push({
                name: null,
                cardid: null,
                placetype: 'queen',
                strength: null,
                abilitytext: null,
                restrictiontext: null,
                placeholder: true,
                id: newqueenid
            })
        }
    }
    // checking in guest
    for (let i = 0; i < gamestate.table.guest.length; i++) {
        const element = gamestate.table.guest[i];
        if (id === element.id) {
            //finding the card
            card = element;
            role = 'guest';
            let newqueenid;
            //finding available id
            for (let j = 1; j < 100; j++) {
                const createdid = 'f' + j;
                let canuseid;
                for (let k = 0; k < gamestate.table.guest.length; k++) {
                    if (createdid === gamestate.table.guest[k].id) {
                        canuseid = false;
                    }
                }
                if (canuseid) {
                    newqueenid = createdid;
                }
            }
            //adding the queen
            gamestate.table.guest.push({
                name: null,
                cardid: null,
                placetype: 'queen',
                strength: null,
                abilitytext: null,
                restrictiontext: null,
                placeholder: true,
                id: newqueenid
            })
        }
    }
    return gamestate;
}

module.exports = ability;