import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./poll.css";

function Poll() {


  const [pollData, setPollData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const url = "http://localhost:5000/poll";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPollData(data.Polling));
  }, []);

  const openPopup = (poll) => {
    setSelectedPoll(poll);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedPoll(null);
    setSelectedOption(null);
    setShowPopup(false);
  };

  const handleVote = (pollId, option) => {
    const updatedPollData = pollData.map((poll) => {
      if (poll.id === pollId) {
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
        };
      }
      return poll;
    });
    setPollData(updatedPollData);
    //closePopup();

    // Update API with updated data
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Polling: updatedPollData }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="poll">
      {pollData.map((poll) => (
        <div key={poll.id}>
          <h1 className="poll-title">{poll.title}</h1>
          <p className="poll-description">{poll.description}</p>
          <button className="poll-button" onClick={() => openPopup(poll)}>Show Poll</button>
        </div>
      ))}
      <Modal className="pop-up" isOpen={showPopup} onRequestClose={closePopup}>
        <h2 className="popup-description">{selectedPoll?.description}</h2>
        {selectedPoll?.options.map((option) => (
          <div key={option.id}>
            <modal>
              <input
                type="radio"
                name="pollOption"
                value={option.option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              {option.option}
            </modal>
          </div>
        ))}
        <button onClick={() => handleVote(selectedPoll?.id, selectedOption)} className="vote-button">Vote</button>
        <button onClick={closePopup} className="vote-button">Close</button>
      </Modal>
    </div>
  );
}

export default Poll;