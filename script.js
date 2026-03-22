/* Name: Isaac Euceda 
 Date: 03/22/2026
 CSC-372
 The JavaScript file for the Github Gallery. Contains the function to load the repositories and display them in the gallery.*/
async function loadRepos() {
    const username = document.getElementById("searchInput").value;
    const gallery = document.getElementById("gallery");
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
    gallery.innerHTML = "Loading";

    try {
        let res = await fetch(apiUrl, {
            headers: {
                "Authorization": "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"
            }
        });
        res = await res.json();

        if (res.length === 0) {
            gallery.innerHTML = "No repositories found.";
            return;
        }

        gallery.innerHTML = "";

        for (let repo of res) {
            let langRes = await fetch(repo.languages_url);
            if (!langRes.ok) {
                throw new Error(await langRes.text());
            }
            langRes = await langRes.json();
            const langList = Object.keys(langRes).join(", ") || "None";

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
      <h3>
          <i class="fa-brands fa-github"></i><a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </h3>
      <p>
          <i class="fa-solid fa-align-left"></i>
          ${repo.description || "No description"}
      </p>
      <p>
          <i class="fa-solid fa-calendar-plus"></i>
          <strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}
      </p>
      <p>
          <i class="fa-solid fa-calendar-check"></i>
          <strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}
      </p>
      <p>
          <i class="fa-solid fa-code"></i>
          <strong>Languages:</strong> ${langList}
      </p>
      <p>
          <i class="fa-solid fa-eye"></i>
          <strong>Watchers:</strong> ${repo.watchers_count}
      </p>
  `;
            gallery.appendChild(card);
        }

    } catch (err) {
        gallery.innerHTML = "Error loading repositories.";
        console.error(err);
    }
}


window.onload = () => {
    document.getElementById("searchInput").value = "ieuceda26";
    loadRepos();
};

document.getElementById("searchButton").addEventListener("click", loadRepos);