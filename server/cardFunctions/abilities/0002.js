const ability = (gamestate, id)=>{
    let count = 0;
    for (let i = 0; i < gamestate.table.host.length; i++) {
        const element = gamestate.table.host[i];
        if(element.placeholder===false){
            count++;
        }
    }
    for (let i = 0; i < gamestate.table.guest.length; i++) {
        const element = gamestate.table.guest[i];
        if(element.placeholder===false){
            count++;
        }
    }
    let random = Math.floor(Math.random() * count) + 1;
    console.log('generated random..',random)
    for (let i = 0; i < gamestate.table.host.length; i++) {
        const element = gamestate.table.host[i];
        if(element.placeholder===false){
            random--;
            if(!random){
                gamestate.table.host.splice(i,1);
                console.log(element)
                break;
            }
        }
    }
    for (let i = 0; i < gamestate.table.guest.length; i++) {
        const element = gamestate.table.guest[i];
        if(element.placeholder===false){
            random--;
            if(!random){
                gamestate.table.guest.splice(i,1);
                console.log(element)
                break;
            }
        }
    }
    return gamestate;
}

module.exports = ability;