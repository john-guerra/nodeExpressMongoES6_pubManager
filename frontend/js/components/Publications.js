export default function Publications() {
  const me = {};
  // get the page from the URL query string
  let page = new URLSearchParams(window.location.search).get("page") || 1;
  let totalPages = 5; // This should be fetched from the server

  const renderPublication = (pub) => `
        <div class="list-group-item">
          <h5 class="mb-1">${pub.title}</h5>
          <div>${pub.venue}</div>
          ${pub.authors && `<div>${pub.authors.map((a) => a.name).join(", ")}</div>`}
        </div>
      `;

  const renderPublications = (publications) => {
    const publicationsDiv = document.getElementById("publications");
    publicationsDiv.innerHTML = `
    <h3 class="mt-4">Publications List</h3>
    <div id="publications-list" class="list-group mt-3">
      ${publications.map(renderPublication).join("\n")}
      ${publications.length === 0 ? `<p>No publications found.</p>` : ""} 
    </div>
    `;
  };

  me.reloadPublications = async () => {
    const res = await fetch(`/api/publications/?page=${page}`);
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

    totalPages = data.totalPages || 5; // Update totalPages from server response if available
    renderPublications(data.data);
    me.renderPagination();
  };

  const switchToPage =
    (newPage = 1) =>
    (e) => {
      e.preventDefault();
      page = newPage;
      me.reloadPublications();
    };

  const renderPages = (currentPage, totalPages) => {
    const fragment = document.createDocumentFragment();

    // Show page items for current page -4 to current page +4
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement("li");
      li.className = `page-item ${i === currentPage ? "active" : ""}`;

      const a = document.createElement("a");
      a.className = "page-link";
      a.href = "#";
      a.dataset.page = i;
      a.innerText = i;
      a.addEventListener("click", switchToPage(i));

      li.appendChild(a);
      fragment.appendChild(li);
    }
    return fragment;
  };

  me.renderPagination = () => {
    const paginationDiv = document.getElementById("pagination");
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation example");

    const ul = document.createElement("ul");
    ul.className = "pagination";

    // Previous button
    const prevLi = document.createElement("li");
    prevLi.className = "page-item";
    const prevA = document.createElement("a");
    prevA.className = "page-link";
    prevA.href = "#";
    prevA.innerText = "Previous";
    prevA.addEventListener("click", switchToPage(Math.max(1, page - 1)));
    prevLi.appendChild(prevA);
    ul.appendChild(prevLi);

    // Page numbers
    ul.appendChild(renderPages(page, totalPages));

    // Next button
    const nextLi = document.createElement("li");
    nextLi.className = "page-item";
    const nextA = document.createElement("a");
    nextA.className = "page-link";
    nextA.href = "#";
    nextA.innerText = "Next";
    nextA.addEventListener(
      "click",
      switchToPage(Math.min(totalPages, parseInt(page) + 1))
    );
    nextLi.appendChild(nextA);
    ul.appendChild(nextLi);

    nav.appendChild(ul);
    paginationDiv.innerHTML = "";
    paginationDiv.appendChild(nav);
  };

  return me;
}
