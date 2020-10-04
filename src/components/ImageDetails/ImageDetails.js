import React, {useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom';
import StickyHeader from 'react-sticky-header';
import Navbar from '../Navbar';
import './ImageDetails.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageDetails = (selectedImg) => {
   
    const history = useHistory();
    const [img, setImg] = useState({
        src: "",
        thumbnail: "",
        thumbnailWidth: "",
        thumbnailHeight: "",
        caption: "",
        key: ""
    });

    console.log(selectedImg)
    window.scrollTo(0, 0)
    

    useEffect(() =>
    {

      if(selectedImg.location.state == undefined)
      {
        let str = selectedImg.location.pathname
        let index  = str.lastIndexOf("/")
        let id = str.slice(index+1, str.length);
    
        const accessKey = process.env.REACT_APP_ACCESSKEY;
        const url = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
        fetch(url)  .then(res => res.json())
        .then(data => {console.log(data);
            setImg({
                src: data.urls.regular,
                thumbnail: data.urls.small,
                thumbnailWidth: data.width/10,
                thumbnailHeight: data.height/10,
                caption: data.alt_description,
                key: data.id
            })
        })
      }
      else
      setImg(selectedImg.location.state.selectedImg);

    },[])
  


    let showDetails = true;
    if(img.caption == null)
        showDetails = false;

        
    const onClickDownload = () => {
        fetch(img.src)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'newImg.jpg';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
    }


    const onClickBack= () =>{
        history.push('/home')
    }



    const onClickShare= () =>{
        if (navigator.share) {
            navigator
              .share({
                title: "infinite-scroll image viewer",
                text: `Sharing this link with you`,
                url: document.location.href,
              })
              .then(() => {
                console.log('Successfully shared');
              })
              .catch(error => {
                console.error('Something went wrong sharing the blog', error);
              });
          }
          else
            toast.info("Link copied to the clipboard!",{position: toast.POSITION.BOTTOM_RIGHT,})
    }



    return (
        <div className="mainDiv">

            <StickyHeader header={<Navbar/>}/>

            <div className="firstRow">
                <button 
                        type="button"
                        class="btn btn-primary back" 
                        onClick={onClickBack}><i class="fas fa-angle-left"></i>Back</button>

                <img className="selected-Img" key={img.key} src={img.thumbnail}/>
            </div>
            
            <div className="row sec">
                {showDetails ? (<div className="titles col"><h6 >Image details:</h6>
                <h6>{img.caption}</h6></div>): (null)} 

                <div className="col">
                <CopyToClipboard text={window.location.href}>
                    <button 
                        type="button"
                        class="btn btn-primary share" 
                        onClick={onClickShare}>Share<i class="fas fa-share-alt left"></i></button>
                      </CopyToClipboard>
                    <button 
                        type="button"
                        class="btn btn-primary download" 
                        onClick={onClickDownload}>Download<i class="fas fa-download left"></i></button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ImageDetails;