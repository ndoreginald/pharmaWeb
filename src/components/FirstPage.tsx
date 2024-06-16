import 'bootstrap/dist/css/bootstrap.min.css';

function FirstPage() {
  return (
    <>
         <div className="col-lg-12 mb-5">
        <div className='hero route bg-image wrapper wrapper::before '></div>
                    <div className='content' style={{ paddingLeft: '99px', paddingRight: '71px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: '310px', width: '310px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img
                        src="img/img_ellipse_25.png"
                        alt=""
                        className="rounded-circle w-full object-cover mt-5 thick-green-border"
                        style={{ height: '50%', width: '50%', objectFit: 'cover' ,display: 'block', margin: 'auto'}}
                        />
                         </div>
                            <h2 className=' mb-3' style={{textAlign: 'center',color:'white'}}><span style={{color:'green'}}>Meilleur produit , Meileur prix</span></h2>
                            <p style={{textAlign: 'center', fontFamily: "Arial, sans-serif", lineHeight: "0", fontWeight: "bold", color:'white' }}><i>Choose our platform to purchase pharmaceutical products safety and a at low price</i></p>
                        <br/><br/>
                        <div>
                           <a href="/login">  <button className="btn btn-primary py-2 px-4 mb-5" type="submit" id="sendMessageButton" style={{ display: 'block', margin: 'auto' }}>Get
                                Started</button></a>
                           </div>
            </div>
        </div>
    </>
  );
};

export default FirstPage;