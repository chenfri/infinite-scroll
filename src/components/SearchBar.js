import React, {useState} from 'react'
 

const SearchBar = ({userSubmit}) => {
const [serachVal , setSerachVal] = useState("");
    

  const onInputChange = (event) => {
    setSerachVal(event.target.value);
  }

 
      return (
          <div style={{fontFamily:"cursive"}}>
              <form
                onSubmit={()=>{userSubmit(serachVal)}}
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
                    onClick={()=>{userSubmit(serachVal)}}>Search<i class="fas fa-search" style={{marginLeft: "0.5vw"}}></i></button>
                    </div>
              </form>

          </div>
      )
  
}


export default SearchBar;