'use strict'
/**
   * @name  anonymous (no name)
   * @function
   * 
   * @description holds the shadow DOM footer HTML string
   * 
   * @return {String} the shadow DOM footer HTML string 
   * 
   */
export default () => {
    return `
    <button class="open-button" id="chat">Chat with us</button>

    <div class="chat-popup" id="chat-container">
      <div id="app" class="chat-messages"></div>
      <form action="" class="form-container" id="message-container">
       <!--- <h1>Chat</h1> --->
    
        <label for="msg"><b>Message</b></label>
        <textarea placeholder="Type message.." name="msg" required id="chat-message"></textarea>
    
        <button type="submit" class="btn">Send</button>
        <button type="button" class="btn cancel" id="close">Close</button>
      </form>
    </div>
`
}