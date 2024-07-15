import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function ChatPage () {

  const navigate = useNavigate();
  
    return (
      <>
            {/*-- Breadcrumb Start --*/}
            <br /><br />
            <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-11">
                            <nav className="breadcrumb bg-light mb-30">
                                <a className="breadcrumb-item text-dark" href="/">Home</a>
                                <a className="breadcrumb-item text-dark" href="/faq">FAQs</a>
                                <span className="breadcrumb-item active">Question</span>
                            </nav>
                        </div>
                        <div className="col-1">
                        <button className="btn btn-block btn-warning font-weight-bold  py-2" onClick={() => navigate(`/faq/`)}
                            >Back</button> 
                        </div>
                    </div>
                </div>
             {/*-- Breadcrumb Start --*/}

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
        <Button variant="contained" endIcon={<FontAwesomeIcon icon={faPaperPlane} />}>Send</Button>
      </div>
    </div>
    </div>
      </>
    )
  
}

export default ChatPage
