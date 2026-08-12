const GITHUB_ORG = 'ExpansionPak';

async function fetchGitHubProjects() {
    const container = document.getElementById('github-projects');
    
    try {
        // Fetch public repositories (sorted by last updated)
        const response = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=updated&per_page=10`);
        
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repos = await response.json();
        container.innerHTML = ''; // Clear loading text

        // Filter out forks if you only want original projects
        const sourceRepos = repos.filter(repo => !repo.fork);

        sourceRepos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            card.innerHTML = `
                <div>
                    <h4><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h4>
                    <p class="project-desc">${repo.description || 'No description provided.'}</p>
                </div>
                <div class="project-stats">
                    ${repo.language ? `<span class="stat-item">🏷️ ${repo.language}</span>` : ''}
                    <span class="stat-item">⭐ ${repo.stargazers_count}</span>
                    <span class="stat-item">🍴 ${repo.forks_count}</span>
                    <span class="stat-item">❗ ${repo.open_issues_count}</span>
                </div>
            `;
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="error">Unable to load projects right now.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
