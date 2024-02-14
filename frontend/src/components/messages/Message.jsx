
const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className="chat-image avatar">
       <div className="w-10 rounded-full">
         <img src="https://api.lorem.space/image/face?hash=33791" />
       </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>
         Hi! What`s up?`
      </div>
    </div>
  )
}

export default Message
