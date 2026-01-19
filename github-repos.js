// GitHub Repos Preview
// Fetches and displays specified repositories from GitHub API

(function() {
    const GITHUB_USERNAME = 'loki52501';
    const FEATURED_REPOS = [
        'autoencode_detection_research-Project',
        'site_testing',
        'loki52501.github.io',
        'mini_netflix_for_haloween',
        'phish-guardians'
    ];

    // Language colors (matching GitHub's colors)
    const LANGUAGE_COLORS = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#3178c6',
        'Python': '#3572A5',
        'C++': '#f34b7d',
        'C': '#555555',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Jupyter Notebook': '#DA5B0B',
        'Shell': '#89e051',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Java': '#b07219',
        'Ruby': '#701516'
    };

    async function fetchRepos() {
        const container = document.getElementById('github-repos-container');
        if (!container) return;

        container.innerHTML = '<p class="loading-repos">Loading repositories...</p>';

        try {
            const repos = await Promise.all(
                FEATURED_REPOS.map(async (repoName) => {
                    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
                    if (!response.ok) return null;
                    return response.json();
                })
            );

            const validRepos = repos.filter(repo => repo !== null);

            if (validRepos.length === 0) {
                container.innerHTML = '<p class="repos-error">Unable to load repositories.</p>';
                return;
            }

            renderRepos(validRepos, container);
        } catch (error) {
            console.error('Error fetching repos:', error);
            container.innerHTML = '<p class="repos-error">Unable to load repositories. Please check back later.</p>';
        }
    }

    function renderRepos(repos, container) {
        const html = repos.map(repo => {
            const languageColor = LANGUAGE_COLORS[repo.language] || '#586069';
            const description = repo.description || 'No description provided';
            const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            return `
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
                    <div class="repo-header">
                        <svg class="repo-icon" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                        </svg>
                        <span class="repo-name">${repo.name}</span>
                    </div>
                    <p class="repo-description">${description}</p>
                    <div class="repo-meta">
                        ${repo.language ? `
                            <span class="repo-language">
                                <span class="language-dot" style="background-color: ${languageColor}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        <span class="repo-stat">
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="repo-stat">
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <path fill="currentColor" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                    <div class="repo-updated">Updated ${updatedDate}</div>
                </a>
            `;
        }).join('');

        container.innerHTML = html;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fetchRepos);
    } else {
        fetchRepos();
    }
})();
