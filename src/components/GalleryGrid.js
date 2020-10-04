import React, {useState, useEffect } from 'react'
import Gallery from 'react-grid-gallery';
import { useHistory} from 'react-router-dom';

 const GalleryGrid = ({images}) => {
    const history = useHistory();

    const [selectedImg, setSelectedImg] = useState([]);

    let IMAGES = []
    images.forEach(img => {
        IMAGES.push(
         {
            src: img.urls.regular,
            thumbnail: img.urls.small,
            thumbnailWidth: img.width/10,
            thumbnailHeight: img.height/10,
            caption: img.alt_description,
            key: img.id
        })
    });

 
    const imageClicked = (index) => {
        setSelectedImg(IMAGES[index]);
      }


    useEffect(() => { 
        if(selectedImg.length != 0)
             history.push(`/imageDetails/${selectedImg.key}`, {selectedImg:selectedImg})

    }, [selectedImg])



    return (
        <div>
            <Gallery images={IMAGES}
                enableImageSelection={false}
                enableLightbox={false}
                rowHeight={250}
                onClickThumbnail={imageClicked}
                margin={3}/>
        </div>
    )
}

export default GalleryGrid;