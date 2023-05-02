import { Tabs, Tab } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import "./poll.css";
import Modal from "react-modal";
import { Dropdown } from "react-bootstrap";

function Polling(props) {

  const [allPollData, setAllPollData] = useState([]);
  const [myPollData, setMyPollData] = useState([]);
  const [searchedPollData, setSearchedPollData] = useState([]);
  const [pollModalIsOpen, setPollModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [enddate, setEnddate] = useState("");
  const [options, setOptions] = useState([]);
  const [showPollPopup, setShowPollPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
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
    fetch('http://localhost:5000/poll')
      .then((response) => response.json())
      .then((data) => setAllPollData(data));
      
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/mypoll?creater=${props.id}`)
      .then((response) => response.json())
      .then((data) => setMyPollData(data));
  }, []);

  const searchPolls = () => {
    fetch(`http://localhost:5000/searchpoll?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setSearchedPollData(data));
  }


  const handleAddOption = () => {
    setOptions([...options, { id: options.length, votes: 0, content: "" }]);
  };

  const handleOptionChange = (index, content) => {
    const newOptions = [...options];
    newOptions[index].content = content;
    setOptions(newOptions);
  };

  const openPoll = async (poll) => {
    setSelectedPoll(poll);
    setShowPollPopup(true);
    //setResultModalIsOpen(false);
  };

  const closePoll = () => {
    setSelectedPoll(null);
    setShowPollPopup(false);
  };

  const openResults = async (poll) => {
    setSelectedPoll(poll);
    setShowPollPopup(true);
    setShowResultPopup(true);
  };

  const closeResults = () => {
    setShowPollPopup(true);
    setSelectedPoll(null);
    setShowResultPopup(false);
  };


  const HandleDeletePoll = (poll_id) => {
    fetch("http://localhost:5000/deletepoll", {
      method: 'DELETE',
      body: JSON.stringify({ poll_id}),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setPollModalIsOpen(false);
  };

  const handleCreatePoll = () => {
    const creater=props.id;
    const poll_id=allPollData.length+1;
    fetch("http://localhost:5000/poll", {
      method: 'POST',
      body: JSON.stringify({ poll_id, creater, title, description,enddate,options, totalVotes: 0}),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setPollModalIsOpen(false);
  };


  const handleVote = (pollId, option) => {
    console.log(pollId, option);
    const voter=props.id;
    const updatedPolls = allPollData.map((poll) => {
      if (poll.poll_id === pollId) {
        const updatedOptions = poll.options.map((o) => {
          if (o.id === option.id) {
            return {
              ...o,
              votes: o.votes + 1,
            };
          }
          return o;
        });
        return {
          ...poll,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1,
        };
      }

      return poll;
    });

    const updatedPoll = updatedPolls.find((poll) => poll.poll_id === pollId);
    setAllPollData(updatedPolls);
    setMyPollData(updatedPolls);
    setSearchedPollData(updatedPolls);
    closePoll();		


    //update results
    fetch("http://localhost:5000/update-poll", {
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
      <Tab eventKey="tab1" title="All Polls">
      <div className="poll">
      <div className="current-time">{currentTime}</div>
      
      {
        allPollData.map((poll) => (
        <div key={poll.poll_id}>
          <h1 className="poll-title">{poll.title}</h1>
          <p className="poll-description">{poll.description}</p>
          <p className="poll-description">End Date: {poll.enddate}</p>
          <p className="poll-description">Total Votes: {poll.totalVotes}</p>
          <button className="poll-button" onClick={() => openPoll(poll)}>Show Poll
          </button>
        </div>
        ))
      }
      <Modal className="pop-up" isOpen={showPollPopup} onRequestClose={closePoll}>
        <h2 className="popup-description">{selectedPoll?.description}</h2>
          {selectedPoll?.options.map((option) => (
            <button
              key={option.id}
              className="option-button"
              onClick={() => handleVote(selectedPoll?.poll_id, option)}
            >
              {option.content}
            </button>
          ))}
          <button onClick={closePoll} className="vote-button">
            Close
          </button>
          <button onClick={() => openResults(selectedPoll)}>Show Result</button>
          <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
          {
            selectedPoll?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedPoll?.totalVotes}</p>
            <button onClick={closeResults} className="vote-button">
              Hide Result
            </button>
          </Modal>
      </Modal>
      <Modal className="pop-up" isOpen={pollModalIsOpen}>
        <h2>Create a Poll</h2>
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
        <label>
          Options:
          <ul>
            {options.map((option, index) => (
              <li key={option.id}>
                <input
                  type="text"
                  value={option.content}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </li>
            ))}
          </ul>
          <button className="poll-creation-buttons" onClick={handleAddOption}>Add Option</button>
        </label>
        <br />
        <button className="poll-creation-buttons" onClick={handleCreatePoll}>Create Poll</button>
        <button className="poll-creation-buttons" onClick={() => setPollModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
      </Tab>

      <Tab eventKey="tab2" title="My Polls">
          <div className="poll">
          <div className="current-time">{currentTime}</div>
          <h1>Hi! {props.id}</h1>
          <button className="createPoll-button" onClick={() => setPollModalIsOpen(true)}>Create Poll</button>
          {
            myPollData.map((poll) => (
            <div key={poll.poll_id}>
              <h1 className="poll-title">{poll.title}</h1>
              <p className="poll-description">{poll.description}</p>
              <button className="poll-button" onClick={() => openPoll(poll)}>Show Poll</button>
              <button className="poll-button" onClick={() => HandleDeletePoll(poll.poll_id)}>Delete Poll
              </button>
            </div>
            ))
          }
          <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
          {
            selectedPoll?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedPoll?.totalVotes}</p>
            <button onClick={closeResults} className="vote-button">
              Hide Result
            </button>
          </Modal>
          <Modal className="pop-up" isOpen={pollModalIsOpen}>
            <h2>Create a Poll</h2>
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
            <label>
              Options:
              <ul>
                {options.map((option, index) => (
                  <li key={option.id}>
                    <input
                      type="text"
                      value={option.content}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
              <button className="poll-creation-buttons" onClick={handleAddOption}>Add Option</button>
            </label>
            <br />
            <button className="poll-creation-buttons" onClick={handleCreatePoll}>Create Poll</button>
            <button className="poll-creation-buttons" onClick={() => setPollModalIsOpen(false)}>Cancel</button>
          </Modal>
        </div>
      </Tab>
      <Tab eventKey="tab3" title="Search for Polls">
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
              searchedPollData.map((poll) => (
              <div key={poll.poll_id}>
                <h1 className="poll-title">{poll.title}</h1>
                <p className="poll-description">{poll.description}</p>
                <button className="poll-button" onClick={() => openPoll(poll)}>Show Poll
                </button>
              </div>
              ))
            }
            <Modal className="pop-up" isOpen={showPollPopup} onRequestClose={closePoll}>
              <h2 className="popup-description">{selectedPoll?.description}</h2>
                {selectedPoll?.options.map((option) => (
                  <button
                    key={option.id}
                    className="option-button"
                    onClick={() => handleVote(selectedPoll?.poll_id, option)}
                  >
                    {option.content}
                  </button>
                ))}
                <button onClick={closePoll} className="vote-button">
                  Close
                </button>
                <button onClick={() => openResults(selectedPoll)}>Show Result</button>
                <Modal className="pop-up" isOpen={showResultPopup}  onRequestClose={closePoll}>
                {
                  selectedPoll?.options.map((option) => (
                    <ul> {option.content} ({option.votes} votes) </ul>
                  ))}
                  <p>Total Votes: {selectedPoll?.totalVotes}</p>
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
