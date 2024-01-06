const tabs = document.querySelectorAll('header ul li h2 a');
const sections = document.querySelectorAll('main section');

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove 'active' class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Hide all sections
        sections.forEach(section => section.style.display = 'none');

        // Get the target section's ID and display it
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).style.display = 'block';

        // Add 'active' class to the clicked tab
        this.classList.add('active');
    });
});

const logos = [
    { name: 'C-Biscuit', slug: 'C-Biscuit' },
    { name: 'Main Logo (Gray)', slug: 'main_gray' },
    { name: 'Main Logo (White)', slug: 'main_white' },
    { name: 'Main Logo (Yellow)', slug: 'main' },
    { name: 'Text Logo', slug: 'text' },
];

const logosContainer = document.getElementById('logos');

logos.forEach(logo => {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo-item');

    const logoTitle = document.createElement('h3');
    logoTitle.textContent = logo.name;

    const logoImage = document.createElement('img');
    logoImage.src = `/assets/png/${logo.slug}.png`; // Default to PNG

    let svgVersion = false;

    // Fetch SVG for better quality
    fetch(`/assets/svg/${logo.slug}.svg`)
        .then(response => response.text())
        .then(svgData => {
            // Create an SVG element and set its content
            const svgElement = new DOMParser().parseFromString(svgData, 'image/svg+xml').querySelector('svg');
            logoImage.src = `data:image/svg+xml,${encodeURIComponent(svgElement.outerHTML)}`;
            svgVersion = true;
        })
        .catch(error => {
            console.error('Error fetching SVG:', error);
        });

    // Add event listener for hovering over the logo
    logoDiv.addEventListener('mouseenter', function () {
        // Display download options
        const downloadOptions = document.createElement('div');
        downloadOptions.classList.add('download-options');

        if (svgVersion) {
            const downloadSvg = document.createElement('a');
            downloadSvg.textContent = 'Download SVG';
            downloadSvg.href = `/assets/svg/${logo.slug}.svg`;
            downloadSvg.download = `${logo.slug}.svg`;

            downloadOptions.appendChild(downloadSvg);
        }

        const downloadPng = document.createElement('a');
        downloadPng.textContent = 'Download PNG';
        downloadPng.href = `/assets/png/${logo.slug}.png`;
        downloadPng.download = `${logo.slug}`;

        downloadOptions.appendChild(downloadPng);

        // Append download options to the logo container
        logoDiv.appendChild(downloadOptions);
    });

    // Add event listener for moving the mouse out of the logo
    logoDiv.addEventListener('mouseleave', function () {
        // Remove download options
        const downloadOptions = logoDiv.querySelector('.download-options');
        if (downloadOptions) {
            downloadOptions.remove();
        }
    });

    // Append logo elements to the logos container
    logoDiv.appendChild(logoTitle);
    logoDiv.appendChild(logoImage);
    logosContainer.appendChild(logoDiv);
});