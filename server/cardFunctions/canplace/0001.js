const canplace = (gamestate,card,placeat)=>{
    if(placeat.placetype==='queen'){
        return false;
    }else {
        return true;
    }
}

module.exports = canplace;