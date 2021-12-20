


const Food = ({ imgpath, title, calorie, getdata }) => {


    const handlesubmit = (e) => {


        const quantity = e.target.value

        const temp = {
            name: title,
            calorie: calorie,
            quantity: quantity > 0 || quantity !== '' ? Number.parseInt(quantity) : 0
        }
        
        getdata(temp)
    }


    return (
        <div key={title} className="food" >
            <img src={imgpath} alt={title} />
            <div className="content">
                <h4>{title}</h4>
                <p>{calorie}</p>
            </div>
            <div className="inputfield">
                <input type="number" name="quantity"   onKeyUp={handlesubmit} id="quantity" />
            </div>
        </div>
    )
}


export default Food