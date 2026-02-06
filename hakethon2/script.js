function addOption() {
  const div = document.getElementById("options");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "New Option";
  div.appendChild(input);
}

function createPoll() {
  const question = document.getElementById("question").value;
  const options = [...document.querySelectorAll("#options input")]
    .map(opt => opt.value);

  localStorage.setItem("question", question);
  localStorage.setItem("options", JSON.stringify(options));

  window.location.href = "poll.html";
}

window.onload = function () {
  if (document.getElementById("pollQuestion")) {
    document.getElementById("pollQuestion").innerText =
      localStorage.getItem("question");

    const opts = JSON.parse(localStorage.getItem("options"));
    const container = document.getElementById("pollOptions");

    opts.forEach(opt => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = "add-btn";
      container.appendChild(btn);
    });
  }
};
