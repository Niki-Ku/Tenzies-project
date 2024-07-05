
export default function Square(props){

    // const styles={
    //     backgroundColor: '#222222'
    // }
    return(
        <div 
        className="square" 
        style={{background: props.isHeld ? '#59E391' : 'white'}}
        onClick={()=>props.holdDice(props.id)}
        >
            {props.value}
        </div>
    )
}