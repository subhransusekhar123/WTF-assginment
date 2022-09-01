import axios from 'axios';
import React from 'react'
import Message from './Message';


const Home = () => {
  const [allMessage,setAllMessage] = React.useState([]);
  const [message,setMessage] = React.useState("hello");
  const [gifName,setGifName] = React.useState("");
  const [selectGif,setSelectGif] = React.useState("")
  const [gif,setGif] = React.useState([]);
 

  const selectGifHandler = (url) => {
    setSelectGif(url);
    
  }

  const getGifsImage = (param) => {
    axios.get(`https://api.giphy.com/v1/stickers/search?api_key=xmPVemQJ69iRJ3kCzQmE00eeJYs0tciu&q=${param}&limit=25&offset=0&rating=g&lang=en`)
    .then(res => {setGif(res.data.data)})
    .catch(err => console.log(err))
  
  }

  React.useEffect(() => {
    getGifsImage()
  }, [])

  const changeHandler = (e) => {
    setMessage(e.target.value);
    console.log(message)
  }

  const gifChangeHandler = (e) => {
    setGifName(e.target.value)
    getGifsImage(gifName)
    console.log(gif)
  }

  const submitHandler = () => {
    setAllMessage([...allMessage,{"message":message,"gif_url":selectGif}] )
    setMessage("")
  }


  return (
    <div className='container bg-primary'>
    <div>
        <label for="floatingTextarea2" className='text-primary '>Comments</label>
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{height: "100px"}} onChange={changeHandler} value={message}></textarea>
    </div>
  
        <div style={{width:"20%"}} className="mx-auto d-flex justify-content-evenly my-2">
          <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
</svg> image</button>
          <button className='btn btn-outline-light' data-bs-toggle="modal" data-bs-target="#exampleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gift" viewBox="0 0 16 16">
  <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"/>
</svg> gifs</button>
        </div>

        <button className="btn btn-outline-light" onClick={submitHandler}>submit</button>

        {/* message section */}
        <div>
          {
            allMessage.map((ele)=>{
              return (
                <>
                 <Message message={ele.message} url={ele.gif_url}/>
                </>
              )
            })
          }

        </div>

        {/* modal */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">find gif:</label>
            <input type="text" class="form-control" id="recipient-name" onChange={gifChangeHandler}/>
          </div>
          <div class="mb-3">
            <div className="row">
              {
                gif.map((ele)=>{
                  return (<div className='col-3 ' data-bs-dismiss="modal" onClick={ ()=>selectGifHandler(ele.images.downsized.url) }>
                    <img src={ele.images.downsized.url} alt="hey" srcset="" style={{height:"100px",maxWidth:"100px"}}/>
                  </div>)
                
                })

              }
            </div>
            
          </div>
        </form>
      </div>
      {/* <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div> */}
    </div>
  </div>
</div>

    </div>
  )
}

export default Home;