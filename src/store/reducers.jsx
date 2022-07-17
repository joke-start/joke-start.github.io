
const inintState = {
    myKey:1
}
export default (state = inintState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    const {type,data} =action;
    switch(type){
        case 'addKeyFn':
            newState.myKey++;
            break
        default:
            break;
            
    }
    return newState
}