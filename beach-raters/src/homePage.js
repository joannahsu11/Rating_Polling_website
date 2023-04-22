import React from "react";

export default function Home() {
    return (
        <div className="container">
          <section className="hero">
            <div className="homeIntro">
                <div className="text">
                <h2 className="title">Make Your Voice Heard!</h2>
                <p className="subtitle">
                    Discover the Voice of Your Campus - Create Polls, Ratings, and Cast Your Vote to Gain Insight into What CSULB Students Really Think
                    </p>
                </div>
                <div className="video">
                    <video src="https://videos.ctfassets.net/rvt0uslu5yqp/7MrcvEuf6K6OlURKX3QJyG/9bff400373adc9bfd9e185613eef7cdc/Features_Polling_v4.mp4" loop autoplay/>
                </div>
            </div>
          </section>


          <section>
            <h2 className="title" style={{ textAlign: 'left' }}>Features</h2>
            <div class="create-polls">
                <h2>Create Polls</h2>
                <p>Easily create polls with multiple options and analyze the results.</p>
                <div class="create-poll-images">
                    <tr>
                        <td>
                            <img src="https://images.ctfassets.net/rvt0uslu5yqp/6bvBGUJoo6RXiYsOT86fg7/2c3c10e16cd8559f209eaa06f5d03489/Mentimeter_Branding_Icons_2020-56.png?fm=webp&w=1200&q=75" style={{ width: "40%", height: "40%" }} ></img>
                        </td>
                        <td>
                            <img src="https://images.ctfassets.net/rvt0uslu5yqp/4uIsm0GWdlZKeWsiZsj3dU/db01f73fe6c57b3f2352a8a1440e8c5b/Mentimeter_Branding_Icons_2020-54.png?fm=webp&w=640&q=75"  style={{width: "40%", height: "40%" }} ></img>
                        </td>
                        <td>
                            <img src= "https://images.ctfassets.net/rvt0uslu5yqp/4EZS2bKGizSCz8Ivppzncb/e7cf293ca71c69312df07bae8a71b309/Mentimeter_Branding_Icons_2020_60.png?fm=webp&w=640&q=75" style={{ width: "40%", height: "40%" }} ></img>
                        </td>
                        <td>
                            <img src="https://images.ctfassets.net/rvt0uslu5yqp/3oyvZdkCtWxqxce24OXWCS/77174c7fe507d8b58cbd730e155e17b0/Mentimeter_Branding_Icons_2020-55.png?fm=webp&w=640&q=75" style={{ width:"40%", height: "40%"}}></img>
                        </td>
                    </tr>
                </div>
            </div>
            <div className="create-polls">
             <td>
                <h2>Multiple Choice Polls</h2>
                <p>Collects answers, thoughts, opinions, 
                    and data with simple multiple choice questions.<br />
                    Use them in a live setting or as part of a survey 
                    to hear what your audience has to say.</p>
                </td>
                <td style={{ alignContent: "center" }}>
                    <img src="https://images.ctfassets.net/rvt0uslu5yqp/4uJKnYZaVGYemyF3eVQheb/fef30c31f64ad458c5545593fb7d9262/Mentimeter_Web_Live-Polling_2022_03__2_.svg?&w=640&q=75" style={{ width:"150%", height: "150%"}}></img>
                </td>
            </div>
            <div class="create-polls">
            <td>
                <h2>Create Ratings</h2>
                
                <p>Easily create ratings with multiple options to get fellow students' feedbacks.</p>
                </td>
                <td>
                    <img src="https://employee-performance.com/blog/wp-content/uploads/Performance_Ratings.jpg" style={{ width:"50%", height: "50%"}}></img>
                </td>
            </div>
            </section>

          <footer >
            <p>&copy; Your Polling Website 2023. All rights reserved.</p>
          </footer>
        </div>
      );
    }