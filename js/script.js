$(function(){
	var getCountryNameUrl = 'https://restcountries.eu/rest/v2/name/';
	var countryName = '';
	var countriesList = $('#countries');

	$('#search').click(searchCountries);

	function searchCountries() {
		countryName = $('#country-name').val().trim();
		if(!countryName.length) {
			return;
		}

		$.ajax({
			url: getCountryNameUrl + countryName,
			method: 'GET',
			success: showCountriesList,
			error: showNoData
		});
	}

	function showCountriesList(response) {
		countriesList.empty();
		var matchesCount = 0;
		response.forEach(function(item) {
			$('<li>').text(item.name).appendTo(countriesList);
		});
		$('#search-status').text('Found ' + response.length + ' matching items for "' + countryName + '"');

	}

	function showNoData() {
		countriesList.empty();
		$('#search-status').text('No items found for: ' + '"' + countryName + '"');
	}
});
