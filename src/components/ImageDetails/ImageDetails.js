import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify';
import React, {useState, useEffect } from 'react'
import StickyHeader from 'react-sticky-header';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory} from 'react-router-dom';
import Navbar from '../Navbar';
import './ImageDetails.css'


const ImageDetails = (selectedImg) => {

    window.scrollTo(0, 0)
    const history = useHistory();
    
    const [img, setImg] = useState({ /* the image that displyed on 'image Details' page*/ 
        src: "",
        thumbnail: "",
        thumbnailWidth: "",
        thumbnailHeight: "",
        caption: "",
        key: ""
    });

    
    useEffect(() =>
    {
        if(selectedImg.location.state === undefined) //getting the shared image from api
        {

            let id = selectedImg.match.params.id
            const accessKey = process.env.REACT_APP_ACCESSKEY;
            const url = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`

            fetch(url)  .then(res => res.json())
            .then(data => {
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
  

        
    const onClickBack= () =>{

        if(selectedImg.location.state !== undefined){
            history.push('/', {pagePosition: selectedImg.location.state.pagePosition,
                images: selectedImg.location.state.images})
        }
        else
            history.push('/')
    }
    

    /* The method download the image to 'Downloads' folder */
    const onClickDownload = () => {

        fetch(img.src).then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');

          a.style.display = 'none';
          a.href = url;
          a.download = img.key;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
    }


    /* The method handle with sharing an image in two ways  */
    const onClickShare= () =>{
        if (navigator.share) {  /*native share for supported platform - like mobile*/
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

          else //for unsupported platform - like browser 
            toast.info("Link copied to the clipboard!",{position: toast.POSITION.BOTTOM_CENTER,})
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
                {img.caption ? (<div className="titles col"><h6 >Image details:</h6>
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