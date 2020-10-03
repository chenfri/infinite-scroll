import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, {useState, useEffect , Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import StickyHeader from 'react-sticky-header';
import SearchBar from './components/SearchBar';
import GalleryGrid from './components/GalleryGrid'
import Navbar from './components/Navbar';
import ImageDetails from './components/ImageDetails/ImageDetails'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-sticky-header/styles.css';
import './App.css';

const App = () =>{

  const [images, setImages] = useState([]);
  const [param, setParam] = useState("");
  const [nextPage, setNextPage] = useState(1);


  useEffect(() =>
  {
    fetchImages();
  },[])


  const fetchImages = () => {
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    let url ="";

    if(param != "")
    {
      url = `https://api.unsplash.com/search/photos?query=${param}&page=${nextPage}&per_page=10&client_id=${accessKey}`

    fetch(url)  .then(res => res.json())
    .then(data => {console.log(data);
        setImages([...images, ...data.results]);

        if (nextPage < data.total_pages) {
          setNextPage(nextPage +1);
        }
    })
    }
    else
    {
      url = `https://api.unsplash.com/photos/random?&client_id=${accessKey}&count=25`
      fetch(url)  .then(res => res.json())
      .then(data => {console.log(data);
          setImages([...images, ...data]);
      })
    }
  }



  const onSearchSubmit = async (searchParam) => {
    window.scrollTo(0, 0)

    if(searchParam != "")
    {
      setParam(searchParam);

      const accessKey = process.env.REACT_APP_ACCESSKEY;
      await fetch(`https://api.unsplash.com/search/photos?query=${searchParam}&per_page=10&client_id=${accessKey}`, {
      })  .then(res => res.json())
      .then(data => {console.log(data);
        setImages([...data.results]);
        if (nextPage < data.total_pages) {
          setNextPage(nextPage +1);
        }
      })
    }
  }



 
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route  path="/imageDetails" component={ImageDetails} />
      <Route  path="/" render={()=>(
        
        <Fragment>  
          <StickyHeader  header={
            <div style={{position: "fixed",top: "0",left: "0",right: "0",opacity: "90%",backgroundColor: "white"}}>
                <Navbar/><SearchBar userSubmit={onSearchSubmit}/>
            </div>}>
          </StickyHeader>

          <InfiniteScroll
            dataLength={images.length}
            next={fetchImages}
            hasMore={true}
            className = "infiniteScroll">

          <GalleryGrid images={images}/>
          </InfiniteScroll>  
        </Fragment>
  )} />

    </Switch>
    </div>
    </Router>

  );
  
}

export default App;
