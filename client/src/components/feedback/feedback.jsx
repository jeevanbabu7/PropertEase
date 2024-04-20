import React from 'react'
import './feedback'
const Feedback = () => {
  return (
    <div Name="wrapper">
         <h3>Rate your overall experience</h3>
        <form action="#">
            <div className="rating">
                <input type="number" name="rating" hidden/>
                <i className='bx bx-star star' style={{"--i":0}}></i>
                {/* <i className='bx bx-star star' style="--i: 1;"></i>
                <i className='bx bx-star star' style="--i: 2;"></i>
                <i className='bx bx-star star' style="--i: 3;"></i>
                <i className='bx bx-star star' style="--i: 4;"></i> */}
            </div>
            <textarea name="opinion" cols="30" rows="10" placeholder="Describe your experience.."></textarea>
            <div className="btn-group">
                <button type="submit" className="btn submit">Submit</button>
                <button className="btn cancel">Cancel</button>       
            </div>
        </form>

    </div>

  )
}

export default Feedback
