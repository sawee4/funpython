/* global document, Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";

    // Boutons
    document.getElementById("run").onclick = run;
    document.getElementById("analyze").onclick = analyzeEmailBody;
  }
});

export async function run() {
  const item = Office.context.mailbox.item;
  let insertAt = document.getElementById("item-subject");

  let label = document.createElement("b");
  label.appendChild(document.createTextNode("Subject: "));
  insertAt.appendChild(label);
  insertAt.appendChild(document.createElement("br"));
  insertAt.appendChild(document.createTextNode(item.subject));
  insertAt.appendChild(document.createElement("br"));
}

function analyzeEmailBody() {
  const item = Office.context.mailbox.item;

  item.body.getAsync("text", function (result) {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      const emailText = result.value;
      console.log("Contenu de l'e-mail :", emailText);

      // Affiche le texte dans le panneau
      const display = document.getElementById("email-body");
      display.innerText = emailText;

      // Exemple d'envoi à une API (à activer plus tard)
      fetch("http://127.0.0.1:8000/analyse", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ texte: emailText })
})
.then(response => response.json())
.then(data => {
  const display = document.getElementById("email-body");
  display.innerText = "Correction :\n" + data.correction;
});

    } else {
      console.error("Erreur lors de la récupération du corps de l'e-mail :", result.error);
    }
  });
}
