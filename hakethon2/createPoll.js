document.getElementById("createPoll").addEventListener("click", () => {
  const question = document.getElementById("question").value.trim();
  const optionInputs = document.querySelectorAll(".opt");

  if (!question) {
    alert("Please enter a question");
    return;
  }

  let options = [];
  optionInputs.forEach(input => {
    if (input.value.trim() !== "") {
      options.push(input.value.trim());
    }
  });

  if (options.length < 2) {
    alert("At least 2 options required");
    return;
  }

  const pollData = {
    question,
    options,
    votes: new Array(options.length).fill(0),
    voted: false
  };

  localStorage.setItem("pollData", JSON.stringify(pollData));
  window.location.href = "poll.html";
});
