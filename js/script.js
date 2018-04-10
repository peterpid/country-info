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
			var $listItem = $('<li>').append((new Country(item)).$element).addClass('list-group-item');
			$listItem.appendTo($countriesList);
		});
		$('#results-count').text(response.length);
		$('#query-string').text(countryName);
		$('#results-found').removeClass('d-none');
		$('#results-not-found').addClass('d-none');
		$countriesList.removeClass('d-none');

	}

	function showNoData() {
		$countriesList.empty();
		$('#query-string-failure').text(countryName);
		$('#results-found').addClass('d-none');
		$('#results-not-found').removeClass('d-none');
		$countriesList.addClass('d-none');
	}

	function Country(responseItem) {
		var self = this;
		this.name = responseItem.name;
		this.flag = responseItem.flag;
		this.capital = responseItem.capital;
		this.currency = (responseItem.currencies.length > 0)? responseItem.currencies[0].name: 'no currency';

		this.$element = createCountry();

		function createCountry() {
			var $country = $('<div>').addClass('country-item media');
			var $flag = $('<img>').addClass('flag img-fluid align-self-start border border-secondary mr-3 w-25').attr('src', self.flag);
			var $mediaBody = $('<div>').addClass('media-body w-75');
			var $countryName = $('<h3>').addClass('country-name').text(self.name);
			var $capital = $('<p>').addClass('capital').text('capital: '  + self.capital);
			var $currency = $('<p>').addClass('currency').text('currency: ' +  self.currency);

			$mediaBody.append($countryName)
				.append($capital)
				.append($currency);
			$country.append($flag)
				.append($mediaBody);
			return $country;
		}
	}
});
