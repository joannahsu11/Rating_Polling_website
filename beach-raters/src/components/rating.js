import { Tabs, Tab } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import "./poll.css";
import Modal from "react-modal";
import { Dropdown } from "react-bootstrap";

function Polling(props) {

  const [allRateData, setAllRateData] = useState([]);
  const [myRateData, setMyRateData] = useState([]);
  const [searchedRateData, setSearchedRateData] = useState([]);
  const [rateModalIsOpen, setRateModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enddate, setEnddate] = useState("");
  const options = [
    { id: 0, votes: 0, content: "1" },
    { id: 1, votes: 0, content: "2" },
    { id: 2, votes: 0, content: "3" },
    { id: 3, votes: 0, content: "4" },
    { id: 4, votes: 0, content: "5" },
  ];
  const [showRatePopup, setShowRatePopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [selectedRate, setSelectedRate] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingValue, setRatingValue] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/rate')
      .then((response) => response.json())
      .then((data) => setAllRateData(data));
      
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/myrate?creater=${props.id}`)
      .then((response) => response.json())
      .then((data) => setMyRateData(data));
  }, []);

  const searchPolls = () => {
    fetch(`http://localhost:5000/searchrate?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchedRateData(data));
  }


  const openPoll = async (poll) => {
    setSelectedRate(poll);
    setShowRatePopup(true);
    //setResultModalIsOpen(false);
  };

  const closePoll = () => {
    setSelectedRate(null);
    setShowRatePopup(false);
  };

  const openResults = async (poll) => {
    setSelectedRate(poll);
    setShowRatePopup(true);
    setShowResultPopup(true);
  };

  const closeResults = () => {
    setShowRatePopup(true);
    setSelectedRate(null);
    setShowResultPopup(false);
  };


  const HandleDeletePoll = (rate_id) => {
    fetch("http://localhost:5000/deleterate", {
      method: 'DELETE',
      body: JSON.stringify({ rate_id}),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setRateModalIsOpen(false);
  };

  const handleCreatePoll = () => {
    const creater=props.id;
    const rate_id=allRateData.length+1;
    fetch("http://localhost:5000/rate", {
      method: 'POST',
      body: JSON.stringify({ rate_id, creater, title, description,enddate,options, totalVotes: 0,avgRating: 0}),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setRateModalIsOpen(false);
  };


  const handleVote = (rateId, option) => {
    console.log(rateId, option);
    const updatedRates = allRateData.map((rate) => {
      if (rate.rate_id === rateId) {
        const updatedOptions = rate.options.map((o) => {
          if (o.id === option.id) {
            return {
              ...o,
              votes: o.votes + 1,
            };
          }
          return o;
        });
        const totalRating = updatedOptions.reduce((acc, o) => {
          return acc + o.content * o.votes;
        }, 0);
        const totalVotes = updatedOptions.reduce((acc, o) => {
          return acc + o.votes;
        }, 0);
        return {
          ...rate,
          options: updatedOptions,
          totalVotes: totalVotes,
          totalRating: totalRating,
          avgRating: totalVotes > 0 ? totalRating / totalVotes : 0,
        };
      }
      return rate;
    });
    ;

    const updatedPoll = updatedRates.find((rate) => rate.rate_id === rateId);
    setAllRateData(updatedRates);
    setMyRateData(updatedRates);
    setSearchedRateData(updatedRates);
    closePoll();        


    //update results
    fetch("http://localhost:5000/update-rate", {
      method: 'POST',
      body: JSON.stringify(updatedPoll),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => response.json())
    .then((data) => console.log(data));

  };

  return (
    <Tabs defaultActiveKey="tab1" id="tabs">
      <Tab eventKey="tab1" title="All Rates">
      <div className="rate">
      <div className="current-time">{currentTime}</div>
      
      {
        allRateData.map((rate) => (
        <div key={rate.rate_id}>
          <h1 className="poll-title">{rate.title}</h1>
          <p className="poll-description">End Date: {rate.enddate}</p>
          <button className="poll-button" onClick={() => openPoll(rate)}>Show Rate
          </button>
        </div>
        ))
      }
      <Modal className="pop-up" isOpen={showRatePopup} onRequestClose={closePoll}>
        <h2 className="popup-description">{selectedRate?.description}</h2>
          {selectedRate?.options.map((option) => (
            <button
              key={option.id}
              className="rating-option-button"
              onClick={() => handleVote(selectedRate?.rate_id, option)}
            >
              {option.content}
            </button>
          ))}
          <button onClick={closePoll} className="vote-button">
            Close
          </button>
          <button onClick={() => openResults(selectedRate)}>Show Result</button>
          <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
          {
            selectedRate?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedRate?.totalVotes}</p>
            <p>Rating: {selectedRate?.avgRating.toFixed(2)}</p>
            <button onClick={closeResults} className="vote-button">
              Hide Result
            </button>
          </Modal>
      </Modal>
      <Modal className="pop-up" isOpen={rateModalIsOpen}>
        <h2>Create a Rate</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button className="poll-creation-buttons" onClick={handleCreatePoll}>Create Rate</button>
        <button className="poll-creation-buttons" onClick={() => setRateModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
      </Tab>

      <Tab eventKey="tab2" title="My Rates">
          <div className="poll">
          <div className="current-time">{currentTime}</div>
          <h1>Hi! {props.id}</h1>
          <button className="createPoll-button" onClick={() => setRateModalIsOpen(true)}>Create Rate</button>
          {
            myRateData.map((poll) => (
            <div key={poll.rate_id}>
              <h1 className="poll-title">{poll.title}</h1>
              <button className="poll-button" onClick={() => openPoll(poll)}>Show Poll</button>
              <button className="poll-button" onClick={() => HandleDeletePoll(poll.rate_id)}>Delete Poll
              </button>
            </div>
            ))
          }
          <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
          {
            selectedRate?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedRate?.totalVotes}</p>
            <p>Rating: {selectedRate?.avgRating.toFixed(2)}</p>
            <button onClick={closeResults} className="vote-button">
              Hide Result
            </button>
          </Modal>
          <Modal className="pop-up" isOpen={rateModalIsOpen}>
            <h2>Create a Rate</h2>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
              />
            </label>
            <br />
            <br />
            <button className="poll-creation-buttons" onClick={handleCreatePoll}>Create Rate</button>
            <button className="poll-creation-buttons" onClick={() => setRateModalIsOpen(false)}>Cancel</button>
          </Modal>
        </div>
      </Tab>
      <Tab eventKey="tab3" title="Search for Rates">
        <div>
          <label>
            Search:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
          <button onClick={() => searchPolls()}>Search</button>
            {
              searchedRateData.map((poll) => (
              <div key={poll.rate_id}>
                <h1 className="poll-title">{poll.title}</h1>
                <p className="poll-description">{poll.description}</p>
                <button className="poll-button" onClick={() => openPoll(poll)}>Show Poll
                </button>
              </div>
              ))
            }
            <Modal className="pop-up" isOpen={showRatePopup} onRequestClose={closePoll}>
              <h2 className="popup-description">{selectedRate?.description}</h2>
                {selectedRate?.options.map((option) => (
                  <button
                    key={option.id}
                    className="rating-option-button"
                    onClick={() => handleVote(selectedRate?.rate_id, option)}
                  >
                    {option.content} star
                  </button>
                ))}
                <button onClick={closePoll} className="vote-button">
                  Close
                </button>
                <button onClick={() => openResults(selectedRate)}>Show Result</button>
                <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
                {
                  selectedRate?.options.map((option) => (
                    <ul> {option.content} ({option.votes} votes) </ul>
                  ))}
                  <p>Total Votes: {selectedRate?.totalVotes}</p>
                  <p>Rating: {selectedRate?.avgRating.toFixed(2)}</p>
                  <button onClick={closeResults} className="vote-button">
                    Hide Result
                  </button>
                </Modal>
            </Modal>
        </div>
      </Tab>

    </Tabs>
  );
}

export default Polling;

