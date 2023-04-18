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
                    <video src="https://videos.ctfassets.net/rvt0uslu5yqp/7MrcvEuf6K6OlURKX3QJyG/9bff400373adc9bfd9e185613eef7cdc/Features_Polling_v4.mp4"
 />
                </div>
            </div>
          </section>


          <section className="features">
            <h2 className="title">Features</h2>
            <ul>
              <li>
                <span className="icon">&#128172;</span>
                <h3>Create Polls</h3>
                <p>
                  Easily create polls with multiple options and customize their
                  look and feel to match your brand.
                </p>
              </li>
              <li>
                <span className="icon">&#128219;</span>
                <h3>Share Polls</h3>
                <p>
                  Share your polls with your audience through social media or email
                  and get their feedback.
                </p>
              </li>
              <li>
                <span className="icon">&#127760;</span>
                <h3>Analyze Results</h3>
                <p>
                  Analyze the results of your polls in real-time and get insights to
                  make better decisions.
                </p>
              </li>
            </ul>
          </section>
          <footer >
            <p>&copy; Your Polling Website 2023. All rights reserved.</p>
          </footer>
        </div>
      );
    }