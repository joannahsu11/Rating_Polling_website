// v Create Poll
// v Show Polls

import React, { useState, useEffect } from "react";
import "./poll.css";
import Modal from "react-modal";

function Poll() {

  const url = "http://localhost:5000/rate";

  const [ratingData, setRatingData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [options, setOptions] = useState([]);
  const options = [
    { id: 0, content: "1 Star", votes: 0 },
    { id: 1, content: "2 Star", votes: 0 },
    { id: 2, content: "3 Star", votes: 0 },
    { id: 3, content: "4 Star", votes: 0 },
    { id: 4, content: "5 Star", votes: 0 }
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRatingData(data));
  }, []);

  
  


  
  const openPopup = (poll) => {
    setSelectedPoll(poll);
    if (poll.voted) {
      setSelectedOption(poll.options.find((option) => option.votes > 0));
    } else {
      setSelectedOption(null);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedPoll(null);
    setSelectedOption(null);
    setShowPopup(false);
  };


  const handleCreatePoll = () => {
    console.log('handle');
    const data = { id: ratingData.length, title, description, options, totalVotes: 0, voted: false ,useremail:''};
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    setModalIsOpen(false);
  };


  const handleVote = (pollId, option) => {
    const updatedRatingData = ratingData.map((poll) => {
      
      if (poll.id === pollId) {
        if (poll.voted === false) {
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
            voted: true
          };
        }
      }

      return poll;
    });

    setRatingData(updatedRatingData);
    closePopup();

    // Update API with updated data
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ "Rating": updatedRatingData }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

  };

  return (
    
    <div className="poll">
      <button className="createPoll-button" onClick={() => setModalIsOpen(true)}>Create Rating</button>
      {ratingData.map((poll) => (
        <div key={poll.id}>
          <h1 className="poll-title">{poll.title}</h1>

          <p className="poll-description">{poll.description}</p>
          <button className="poll-button" onClick={() => openPopup(poll)}>Show Rating
          </button>
        </div>
      ))}

      <Modal className="pop-up" isOpen={showPopup} onRequestClose={closePopup}>
        <h2 className="popup-description">{selectedPoll?.description}</h2>
        {
        selectedOption ? (
          <>
            {selectedPoll?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedPoll.totalVotes}</p>
          </>
        ) : (
          <>
            {selectedPoll?.options.map((option) => (
              <button
                key={option.id}
                className="option-button"
                onClick={() => handleVote(selectedPoll?.id, option)}
              >
                {option.content}
              </button>
            ))}
            <button onClick={closePopup} className="vote-button">
              Close
            </button>
          </>
        )}
      </Modal>

      
      <Modal className="pop-up" isOpen={modalIsOpen}>
        <h2>Create a Rating Post</h2>
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
        <br />
          
        <br />
        <div>
          <button className="poll-creation-buttons" onClick={handleCreatePoll}>Create Poll</button>
          <button className="poll-creation-buttons" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Poll;
