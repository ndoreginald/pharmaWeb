
function SignUpPage () {
 
    return (
      <>
            {/* Contact Start */}
<div className="container-fluid">
<h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Log In</span></h2>
<div className="row px-xl-5">
    <div className="col-lg-4 mb-5">
        <div className="contact-form bg-light p-30" style={{ backgroundImage: `url('img/img_rectangle_99.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',backgroundPosition: 'center',padding: '20px', }}>
            <div id="success"></div>
            <div>
            <img
                src="img/img_ellipse_25.png"
                alt=""
                className="rounded-circle w-full object-cover mb-3 thick-green-border"
                style={{ maxWidth: '40%', height: 'auto' }}
                />
               
               <div>
                    <h1 className=' mb-3' style={{textAlign: 'center'}}>Bienvenue sur </h1>
                    <h2 style={{textAlign: 'center', fontFamily: "Arial, sans-serif", color: "#008000" , lineHeight: "0", fontWeight: "bold"}}><u><i>PharmaG</i></u></h2>
                </div><br/><br/><br/><br/>
                </div>
            
            <form name="sentMessage" id="contactForm" noValidate>
                <div className="control-group ">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" className="form-control " id="name" placeholder="Your Name"  style={{ borderWidth: '2px' }}
                        required data-validation-required-message="Please enter your name" />
                    <p className="help-block text-danger"></p>
                </div>
                <div className="control-group ">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Your Email"  style={{ borderWidth: '2px' }}
                        required data-validation-required-message="Please enter your email" />
                    <p className="help-block text-danger"></p>
                </div>
                <div className="control-group ">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="text" className="form-control" id="subject" placeholder="Your Password"  style={{ borderWidth: '2px' }}
                        required data-validation-required-message="Please enter a subject" />
                    <p className="help-block text-danger"></p>
                </div>
                <div className="control-group ">
                <label htmlFor="exampleFormControlInput1" className="form-label">Re-enter password</label>
                    <input type="text" className="form-control" id="subject" placeholder="Your Password"  style={{ borderWidth: '2px' }}
                        required data-validation-required-message="Please enter a subject" />
                    <p className="help-block text-danger"></p>
                </div>
                <div className="mt-5">
                    <button className="btn btn-primary py-2 px-4 mb-5" type="submit" id="sendMessageButton" style={{ display: 'block', margin: 'auto'}}>Send
                        Message</button>
                </div>
                <div><a href="/login"><h6 style={{textAlign: 'left', fontFamily: "Arial, sans-serif", color: "#0000FF" , lineHeight: "0", fontWeight: "bold"}}><u><i>Already have an account?Log In</i></u></h6></a></div>
            </form>
        </div>
    </div>
    <div className="col-lg-8 mb-5">
        <div className="bg-light mb-30">

        <div className="product-img position-relative overflow-hidden">
                <img className="img-fluid w-100"  src="img/img_rectangle_100.jpg" alt="" style={{width: "100%", height: "100%" , border:0}}/>
           </div>
        </div>
        
    </div>
</div>
</div>
{/* Contact End */}
      </>
    )
  }

export default SignUpPage
