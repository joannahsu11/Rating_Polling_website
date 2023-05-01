import React, { useState, useEffect } from "react";
import "./poll.css";
import Modal from "react-modal";

function Polling(props) {

  const [pollData, setPollData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [totalVotes, settotalVotes] = useState([]);
  const [voted, setVoted] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [hideOptions, setHideOptions] = useState(false);


  useEffect(() => {
    fetch("http://localhost:5000/poll")
      .then((response) => response.json())
      .then((data) => setPollData(data));
  }, []);

  const handleAddOption = () => {
    setOptions([...options, { id: options.length, votes: 0, content: "" }]);
  };

  const handleOptionChange = (index, content) => {
    const newOptions = [...options];
    newOptions[index].content = content;
    setOptions(newOptions);
  };

  const openPopup = async (poll) => {
    const response = await fetch('http://localhost:5000/if-voted',{poll});
    const thePoll = await response.json();
    setSelectedPoll(poll);
    console.log(poll);
    if (thePoll.voted) {
      setHideOptions(true);
    } else {
      setHideOptions(true);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedPoll(null);
    setShowPopup(false);
  };


  const handleCreatePoll = () => {
    const creater=props.email;
    const poll_id=pollData.length;
    fetch("http://localhost:5000/poll", {
      method: 'POST',
      body: JSON.stringify({ poll_id, creater, title, description, options, totalVotes: 0}),
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
    const voter=props.email;
    const updatedPolls = pollData.map((poll) => {
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
    setPollData(updatedPolls);
    closePopup();		


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

    fetch("http://localhost:5000/votepoll", {
      method: 'POST',
      body: JSON.stringify({voter,poll_id:pollId}),
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

  
  console.log(selectedPoll);
  return (
    <div className="poll">
      <button className="createPoll-button" onClick={() => setModalIsOpen(true)}>Create Poll</button>
      {pollData.map((poll) => (
        <div key={poll.poll_id}>
          <h1 className="poll-title">{poll.title}</h1>

          <p className="poll-description">{poll.description}</p>
          <button className="poll-button" onClick={() => openPopup(poll)}>Show Poll
          </button>
        </div>
      ))}
      <Modal className="pop-up" isOpen={showPopup} onRequestClose={closePopup}>
        <h2 className="popup-description">{selectedPoll?.description}</h2>
        
        {
        hideOptions ? (
          <>
            {selectedPoll?.options.map((option) => (
              <ul> {option.content} ({option.votes} votes) </ul>
            ))}
            <p>Total Votes: {selectedPoll?.totalVotes}</p>
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
        <button className="poll-creation-buttons" onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default Polling;