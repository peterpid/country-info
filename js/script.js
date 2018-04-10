$(function(){
	var getCountryNameUrl = 'https://restcountries.eu/rest/v2/name/';
	var countryName = '';
	var $countriesList = $('#countries-list');

	$('#search').click(searchCountries);

	function searchCountries() {
		countryName = $('#country-name').val().trim();
		if(!countryName.length) {
			return;
		}

		$.ajax({
			url: getCountryNameUrl + countryName + '?fields=name;capital;currencies;flag',
			method: 'GET',
			success: showCountriesList,
			error: showNoData
		});
	}

	function showCountriesList(response) {
		$countriesList.empty();
		var matchesCount = 0;
		response.forEach(function(item) {
			var $listItem = $('<li>').append((new Country(item)).$element);
			$listItem.appendTo($countriesList);
		});
		$('#search-status').text('Found ' + response.length + ' matching items for "' + countryName + '"');

	}

	function showNoData() {
		$countriesList.empty();
		$('#search-status').text('No items found for: ' + '"' + countryName + '"');
	}

	function Country(responseItem) {
		var self = this;
		this.name = responseItem.name;
		this.flag = responseItem.flag;
		this.capital = responseItem.capital;
		this.currency = (responseItem.currencies.length > 0)? responseItem.currencies[0].name: 'no currency';

		this.$element = createCountry();

		function createCountry() {
			var $country = $('<div>').addClass('country-item');
			console.log('adding: ' + self.name);
			var $countryName = $('<div>').addClass('country-name').text(self.name);
			var $flag = $('<img>').addClass('flag').attr('src', self.flag);
			var $capital = $('<div>').addClass('capital').text(self.capital);
			var $currency = $('<div>').addClass('currency').text(self.currency);

			$country.append($countryName)
				.append($flag)
				.append($capital)
				.append($currency);
			return $country;
		}
	}
});
