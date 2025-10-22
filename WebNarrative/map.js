/*
  Interactive hot-pink world map using Google Charts GeoChart.
  - All countries hot pink, pastel background.
  - On country click, rain that country's flag from the top.
*/

(function () {
    // Load Google Charts
    google.charts.load('current', {
        packages: ['geochart'],
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function getCountryData() {
        // Data with country names and their flag emojis
        return [
            ['Country', 'Flag'], 
            ['United States', '🇺🇸'], ['Canada', '🇨🇦'], ['Brazil', '🇧🇷'], ['Mexico', '🇲🇽'], ['United Kingdom', '🇬🇧'],
            ['France', '🇫🇷'], ['Germany', '🇩🇪'], ['Spain', '🇪🇸'], ['Italy', '🇮🇹'], ['Nigeria', '🇳🇬'],
            ['South Africa', '🇿🇦'], ['Egypt', '🇪🇬'], ['Saudi Arabia', '🇸🇦'], ['India', '🇮🇳'], ['China', '🇨🇳'],
            ['Japan', '🇯🇵'], ['Australia', '🇦🇺'], ['New Zealand', '🇳🇿'], ['Argentina', '🇦🇷'], ['Chile', '🇨🇱'],
            ['Russia', '🇷🇺'], ['Sweden', '🇸🇪'], ['Norway', '🇳🇴'], ['Finland', '🇫🇮']
        ];
    }

    function getCountryRoutingMap() {
        // Map of country names to their page URLs
        return {
            'United States': 'usa.html',
            'Canada': 'canada.html',
            'Brazil': 'brazil.html',
            'Mexico': 'mexico.html',
            'United Kingdom': 'uk.html',
            'France': 'france.html',
            'Germany': 'germany.html',
            'Spain': 'spain.html',
            'Italy': 'italy.html',
            'Nigeria': 'nigeria.html',
            'South Africa': 'south-africa.html',
            'Egypt': 'egypt.html',
            'Saudi Arabia': 'saudi-arabia.html',
            'India': 'india.html',
            'China': 'china.html',
            'Japan': 'japan.html',
            'Australia': 'australia.html',
            'New Zealand': 'new-zealand.html',
            'Argentina': 'argentina.html',
            'Chile': 'chile.html',
            'Russia': 'russia.html',
            'Sweden': 'sweden.html',
            'Norway': 'norway.html',
            'Finland': 'finland.html'
        };
    }

    function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable(getCountryData());

        var options = {
            legend: 'none',
            datalessRegionColor: '#ff2d75', // hot pink
            defaultColor: '#ff2d75', // hot pink
            tooltip: { textStyle: { color: '#4b2c3a' } },
            colorAxis: { colors: ['#ff2d75', '#ff2d75'] }, // uniform color
            backgroundColor: '#ffe4ef', // pastel pink
        };

        var chartContainer = document.getElementById('geo-chart');
        var chart = new google.visualization.GeoChart(chartContainer);
        chart.draw(data, options);

        var countryToUrl = getCountryRoutingMap();

        google.visualization.events.addListener(chart, 'regionClick', function (e) {
            // Get the country name from the selection
            var selection = chart.getSelection();
            var label = null;
            if (selection && selection.length > 0) {
                var item = selection[0];
                if (item.row != null) {
                    label = data.getValue(item.row, 0);
                }
            }

            // Navigate to the country's page
            var url = countryToUrl[label] || countryToUrl[e.region] || null;
            if (url) {
                window.location.href = url;
            }
        });

        // Support select event for keyboard navigation/accessibility
        google.visualization.events.addListener(chart, 'select', function () {
            var selection = chart.getSelection();
            if (!selection || selection.length === 0) return;
            var item = selection[0];
            if (item.row == null) return;
            var label = data.getValue(item.row, 0);
            var url = getCountryRoutingMap()[label];
            if (url) {
                window.location.href = url;
            }
        });

        // Redraw on resize for responsiveness
        window.addEventListener('resize', function () {
            chart.draw(data, options);
        });
    }
})();
