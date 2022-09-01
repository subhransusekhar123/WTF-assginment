import React from 'react'

const Message = ({message,url}) => {
  console.log(message,url)
  return (

    <div class="card mt-2">
  <div class="card-body">
    <p class="card-text text-start text-primary">{message}</p>
   <img src={url} alt="image" srcset="" style={{width:"80%"}}/>
  </div>
</div>

  )
}

export default Message