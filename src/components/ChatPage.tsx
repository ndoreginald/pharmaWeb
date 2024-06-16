

function ChatPage () {
  
    return (
      <>
        <div className='container bg-light'>
    <div className="welcome-page">
      <div className="logo">
        <img src="img/img_ellipse_25.png"
                        alt=""
                        className="rounded-circle w-full object-cover mt-5 thick-green-border"
                         />
      </div>
      <h1 className="title">Bienvenue sur l'assistant virtuel</h1>
      <p className="subtitle">Dites-nous, comment pouvons nous vous aider</p>
      <div className="input-container">
        <input type="text" placeholder="Saisir..." className="input-box" />
        <button className="submit-button">
          <span className="submit-icon">✔️</span>
        </button>
      </div>
    </div>
    </div>
      </>
    )
  
}

export default ChatPage
