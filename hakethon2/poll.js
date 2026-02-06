let poll = JSON.parse(localStorage.getItem("pollData"));

const questionEl = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const resultsDiv = document.getElementById("results");

// admin check
const isAdmin =
  new URLSearchParams(window.location.search).get("admin") === "true";

questionEl.innerText = poll.question;

// show results only for admin
if (isAdmin) {
  resultsDiv.style.display = "block";
}

poll.options.forEach((opt, index) => {
  const btn = document.createElement("button");
  btn.className = "vote-btn";
  btn.innerText = opt;
  btn.onclick = () => vote(index);
  optionsDiv.appendChild(btn);
});

function vote(index) {
  if (poll.voted && !isAdmin) {
    alert("You already voted...Thank You.");
    return;
  }

  poll.votes[index]++;
  poll.voted = true;

  localStorage.setItem("pollData", JSON.stringify(poll));

  if (isAdmin) {
    showResults();
  }
}

function showResults() {
  resultsDiv.innerHTML = "";
  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);

  poll.options.forEach((opt, i) => {
    const percent = totalVotes
      ? Math.round((poll.votes[i] / totalVotes) * 100)
      : 0;

    const p = document.createElement("p");
    p.innerText = `${opt} : ${percent}%`;
    resultsDiv.appendChild(p);
  });
}

// auto-load results for admin
if (isAdmin) {
  showResults();
}
