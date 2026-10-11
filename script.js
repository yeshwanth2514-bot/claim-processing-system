const form = document.getElementById("claimForm");
const claims = document.getElementById("claims");

let claimCount = 0;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const type = document.getElementById("claimType").value;
  const amount = Number(document.getElementById("amount").value);
  const file = document.getElementById("document").files[0];

  if (!name || !type || amount <= 0 || !file) {
    alert("Please enter valid claim details.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Please upload a document smaller than 5 MB.");
    return;
  }

  if (!claims.querySelector(".claim")) {
    claims.innerHTML = "";
  }

  claimCount++;

  const claim = document.createElement("div");
  claim.className = "claim";

  const title = document.createElement("h3");
  title.textContent = "Claim #" + claimCount;

  const details = document.createElement("p");
  details.textContent =
    name + " | " + type + " | ₹" + amount.toFixed(2);

  const documentInfo = document.createElement("p");
  documentInfo.textContent = "Document: " + file.name;

  const status = document.createElement("p");
  status.className = "status";
  status.textContent = "Status: Pending Verification";

  const verifyButton = document.createElement("button");
  verifyButton.textContent = "Verify Document";

  verifyButton.onclick = function () {
    status.textContent = "Status: Verified - Awaiting Approval";
    verifyButton.disabled = true;

    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve Claim";

    approveButton.onclick = function () {
      status.textContent = "Status: Approved";
      approveButton.disabled = true;
    };

    claim.appendChild(approveButton);
  };

  claim.append(title, details, documentInfo, status, verifyButton);
  claims.prepend(claim);

  form.reset();
});