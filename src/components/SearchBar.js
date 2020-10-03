import React, {useState} from 'react'
 


const SearchBar = (props) => {
const [serachVal , setSerachVal] = useState("");
    
  const onInputChange = (event) => {
    setSerachVal(event.target.value);
  }

  const onSearchSubmit = (event) => {
      event.preventDefault();
      console.log(serachVal);
        props.userSubmit(serachVal);
  }

 
      return (
          <div style={{fontFamily:"cursive"}}>
              <form
                onSubmit={onSearchSubmit} 
                className="container">
                <div
                    className="row"
                    style={{justifyContent: "center", marginBottom: "2rem"}}>
                  <input
                      placeholder = "Search an image"
                      className="form-control w-50 mr-5 "
                      type="text"
                      value={serachVal}
                      onChange={onInputChange}
                  />
                  <button 
                    type="submit"
                    class="btn btn-primary" 
                    onClick={onSearchSubmit}>Search</button>
                    </div>
              </form>

          </div>
      )
  
}


export default SearchBar;