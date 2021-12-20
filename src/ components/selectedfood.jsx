


const SelectedFood = ({ quantity, title, calorie, removecart }) => {


    const deletecart = (arg) => {
        removecart(arg)
    }
    return (
        <div key={title} className="food" >
            <div className="content" key={title}>
                <h4>{title}</h4>
                <p>{calorie * quantity}</p>

            </div>
            <button onClick={() => deletecart(title)} className="delete">X</button>

        </div>
    )
}


export default SelectedFood