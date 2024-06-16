

function Carousel (){
 
    return (
      <>
        {/* Carousel Start*/} 
    <div className="container-fluid mb-3">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <div id="header-carousel" className="carousel slide carousel-fade mb-30 mb-lg-0" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                        <li data-target="#header-carousel" data-slide-to="1"></li>
                        <li data-target="#header-carousel" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item position-relative active" style={{height: "430px"}}>
                            <img className="position-absolute w-100 h-100" src="img/carousel-1.jpg" style={{ objectFit: "cover"}}/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Instrument de Chirugie</h1>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Matériel chirugical de qualité pour de bon services</p>
                                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/shop">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item position-relative" style={{height: "430px"}}>
                            <img className="position-absolute w-100 h-100" src="img/carousel-2.jpg" style={{objectFit: "cover"}}/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Medicaments</h1>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Des mediacments de pointes suiavnt les dernières technologie</p>
                                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/shop">Shop Now</a>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item position-relative" style={{height: "430px"}}>
                            <img className="position-absolute w-100 h-100" src="img/carousel-3.jpg" style={{objectFit: "cover"}}/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: "700px"}}>
                                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">Assistance & Consultation</h1>
                                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">Nous restons à l'ecout pour tous vos problèmes de santé. Contacter nous</p>
                                    <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" href="/shop">Shop Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="product-offer mb-30" style={{height: "200px"}}>
                    <img className="img-fluid" src="img/offer-1.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="/shop" className="btn btn-primary">Shop Now</a>
                    </div>
                </div>
                <div className="product-offer mb-30" style={{height: "200px"}}>
                    <img className="img-fluid" src="img/offer-2.jpg" alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <a href="/shop" className="btn btn-primary">Shop Now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Carousel End*/} 
      </>
    )
  }

export default Carousel
