import InfiniteScroll from 'react-infinite-scroll-component';
import React, {useState, useEffect} from 'react';
import StickyHeader from 'react-sticky-header';
import { useHistory} from 'react-router-dom';
import GalleryGrid from './GalleryGrid'
import SearchBar from './SearchBar';
import Navbar from './Navbar';


const Home = (pagePosition) => {

    const history = useHistory();
    const [images, setImages] = useState([]);
    const [param, setParam] = useState("");
    const [nextPage, setNextPage] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0);


    window.onbeforeunload = (e) => {
        history.replace('', null); //for reset the props when the page is refreshed
    };


    
    useEffect(() =>
    {
        if(scrollPosition > 0)
        {
            if (document.documentElement.clientWidth > 1000) //offest for larger width screen
                window.scrollTo(0, scrollPosition + 200);
            else
                window.scrollTo(0, scrollPosition);
        }
          setScrollPosition(0); //reset
        
    },[images])



    useEffect(() =>
    {
        if(pagePosition.location.state != undefined) //if there are props from previous page
        {
            setImages([...pagePosition.location.state.images])
            setScrollPosition(pagePosition.location.state.pagePosition);
        }     
        else //get some photos for the first login
            fetchImages();

    },[])
  
  

    /* The method gets photos from Unsplash api */
    const fetchImages = () => {
      const accessKey = process.env.REACT_APP_ACCESSKEY;
      let url ="";
  
      if(param != "") //search more photos by spesific query
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
      else //search random photos
      {
        url = `https://api.unsplash.com/photos/random?&client_id=${accessKey}&count=25`
        fetch(url)  .then(res => res.json())
        .then(data => {console.log(data);
            setImages([...images, ...data]);
        })
      }
    }
  
  
  /* The method handle with searching photos by user input */
    const onSearchSubmit = async (searchParam) => {
        
      if(searchParam != "") 
      {
        setParam(searchParam);
  
        const accessKey = process.env.REACT_APP_ACCESSKEY;
        await fetch(`https://api.unsplash.com/search/photos?query=${searchParam}&per_page=10&client_id=${accessKey}`, {
        })  .then(res => res.json())
        .then(data => {console.log(data);
          window.scrollTo(0, 0)
          setImages([...data.results]);
          if (nextPage < data.total_pages) {
            setNextPage(nextPage +1);
          }
        })
      }
    }



    return (
        <div>
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
        </div>
    )
}

export default Home;