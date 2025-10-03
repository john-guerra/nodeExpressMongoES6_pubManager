console.log("Hello from the frontend JavaScript file!");

function Publications() {
  const me = {};

  me.reloadPublications = async () => {
    const res = await fetch("/api/publications");
    if (!res.ok) {
      document.querySelector("main").innerHTML += `
        <div class="alert alert-danger" role="alert">
          Error fetching publications: ${res.status} ${res.statusText}
        </div>
      `;
      console.error("Error fetching publications:", res.status, res.statusText);
      return;
    }

    const data = await res.json();
    console.log("Fetched publications data:", data);

    const publicationsDiv = document.getElementById("publications");
    publicationsDiv.innerHTML = `
    <h3 class="mt-4">Publications List</h3>
    <div id="publications-list" class="list-group mt-3">
      <pre>
        Publications: ${JSON.stringify(data, null, 2)}
      </pre>
    </div>
    `;
  };

  return me;
}

const pubs = Publications();
pubs.reloadPublications();
