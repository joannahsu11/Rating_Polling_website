import React, { useState } from "react";

export default function Rating() {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (e) => {
    setRatingValue(parseInt(e.target.value));
  };
  return (
    <form>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div   class="rating-group">
        <input disabled checked class="rating__input rating__input--none" name="rating3" id="rating3-none" value="0" type="radio"></input>
        <label aria-label="1 star" class="rating__label" for="rating3-1"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-1" value="1" type="radio" onChange={handleRatingChange}></input>
        <label aria-label="2 stars" class="rating__label" for="rating3-2"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-2" value="2" type="radio" onChange={handleRatingChange}></input>
        <label aria-label="3 stars" class="rating__label" for="rating3-3"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-3" value="3" type="radio" onChange={handleRatingChange}></input>
        <label aria-label="4 stars" class="rating__label" for="rating3-4"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-4" value="4" type="radio" onChange={handleRatingChange}></input>
        <label aria-label="5 stars" class="rating__label" for="rating3-5"><i class="rating__icon rating__icon--star fa fa-star"></i></label>
        <input class="rating__input" name="rating3" id="rating3-5" value="5" type="radio" onChange={handleRatingChange}></input>
        <span>
        <p  style={{textAlign: 'right'}}> Rating: {ratingValue}/5 stars </p>
        </span>
        </div>

        <div>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <p>4.1 average based on 254 reviews.</p>
        <hr style={{border: "3px solid #f1f1f1"}} />

        <div className="row">
            <div className="side">
            <div>5 star</div>
            </div>
            <div className="middle">
            <div className="bar-container">
                <div className="bar-5"></div>
            </div>
            </div>
            <div className="side right">
            <div>150</div>
            </div>
            <div className="side">
            <div>4 star</div>
            </div>
            <div className="middle">
            <div className="bar-container">
                <div className="bar-4"></div>
            </div>
            </div>
            <div className="side right">
            <div>63</div>
            </div>
            <div className="side">
            <div>3 star</div>
            </div>
            <div className="middle">
            <div className="bar-container">
                <div className="bar-3"></div>
            </div>
            </div>
            <div className="side right">
            <div>15</div>
            </div>
            <div className="side">
            <div>2 star</div>
            </div>
            <div className="middle">
            <div className="bar-container">
                <div className="bar-2"></div>
            </div>
            </div>
            <div className="side right">
            <div>6</div>
            </div>
            <div className="side">
            <div>1 star</div>
            </div>
            <div className="middle">
            <div className="bar-container">
                <div className="bar-1"></div>
            </div>
            </div>
            <div className="side right">
            <div>20</div>
            </div>
        </div>
        <img src={require('./gold-shark.png')} style={{width: '100px', height: '150px'}} />
    </div>
    
    </form>
  );
}
