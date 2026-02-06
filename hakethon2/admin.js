const questionEl = document.getElementById("question");
const resultsDiv = document.getElementById("results");

function loadResults() {
  const poll = JSON.parse(localStorage.getItem("pollData"));

  if (!poll) {
    questionEl.innerText = "No poll found";
    return;
  }

  questionEl.innerText = poll.question;
  resultsDiv.innerHTML = "";

  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

  poll.options.forEach((opt, i) => {
    const percent = totalVotes
      ? Math.round((poll.votes[i] / totalVotes) * 100)
      : 0;

    const p = document.createElement("p");
    p.innerText = `${opt} : ${percent}% (${poll.votes[i]} votes)`;
    resultsDiv.appendChild(p);
  });
}

/* LIVE UPDATE every 1 second */
setInterval(loadResults, 1000);

/* initial load */
loadResults();
