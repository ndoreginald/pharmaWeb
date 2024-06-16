import Footer from "../layout/Footer"
import Navbar from "../layout/Navbar"


function Contact () {
 
    return (
      <>
      <Navbar/>
            {/* Breadcrumb Start */}
    <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                    <a className="breadcrumb-item text-dark" href="/">Home</a>
                    <span className="breadcrumb-item active">Contact</span>
                </nav>
            </div>
        </div>
    </div>
     {/* Breadcrumb End */}

    {/* Contact Start */}
    <div className="container-fluid">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Contact Us</span></h2>
        <div className="row px-xl-5">
            <div className="col-lg-7 mb-5">
                <div className="contact-form bg-light p-30">
                    <div id="success"></div>
                    <form name="sentMessage" id="contactForm" noValidate>
                        <div className="control-group">
                            <input type="text" className="form-control" id="name" placeholder="Your Name"
                                required data-validation-required-message="Please enter your name" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="email" className="form-control" id="email" placeholder="Your Email"
                                required data-validation-required-message="Please enter your email" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <input type="text" className="form-control" id="subject" placeholder="Subject"
                                required data-validation-required-message="Please enter a subject" />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="control-group">
                            <textarea className="form-control" rows={8} id="message" placeholder="Message"
                                required
                                data-validation-required-message="Please enter your message"></textarea>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div>
                            <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Send
                                Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-lg-5 mb-5">
                <div className="bg-light p-30 mb-30">
                    <iframe style={{width: "100%", height: "250px" , border:0}}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                    allowFullScreen={true} // ou allowFullScreen={false} si vous ne souhaitez pas autoriser le mode plein écran
                    aria-hidden="false" 
                    tabIndex={0}></iframe>
                </div>
                <div className="bg-light p-30 mb-3">
                    <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>Tunisia, tunis</p>
                    <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i><a href="mailto:">Kengnejordan2035@.com</a></p>
                    <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3"></i><a>+237 95 41 24 90</a></p>
                </div>
            </div>
        </div>
    </div>
     {/* Contact End */}
     <Footer/>
      </>
    )
  }

export default Contact
