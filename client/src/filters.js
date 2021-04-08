import Vue from 'vue';
import moment from 'moment';

Vue.filter('timestampToHumanDate', (ts, includeTime = true) => {
	return moment(ts).format('LL' + (includeTime ? 'HH:mm:ss' : ''));
});

Vue.filter('timeAgo', (value) => {
	return moment.utc(value).local().fromNow();
});

Vue.filter('toPercentage', (value, decimals = 2, includeNegative = true) => {
	const result = parseFloat(value).toFixed(decimals) + '%';
	return includeNegative ? result : result.substring(1);
});

Vue.filter('toMoney', (value = 0, decimals = 2) => {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: decimals,
	});
});

Vue.filter('toLargeAmount', (value = 0, decimals = 2) => {
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: decimals,
	}).substring(1);
});

Vue.filter('parseTweet', (text) => {

	const parameters = {
		urlClass: 'tweet_link',
		userClass: 'tweet_user',
		hashtagClass: 'hashtag',
		target: '_blank',
		searchWithHashtags: true,
		parseUsers: true,
		parseHashtags: true,
		parseUrls: true
	};

	function generateLink (url, className, target, text) {
		let link = document.createElement('a');
		link.href = url;
		link.classList.add(className);
		link.target = target;
		link.textContent = text;

		return link;
	}

	// @ts-ignore
	const REGEX_URL = /(?:\s)(f|ht)tps?:\/\/([^\s\t\r\n<]*[^\s\t\r\n<)*_,.])/g, //regex for urls
		REGEX_USER = /\B@([a-zA-Z0-9_]+)/g, //regex for @users
		REGEX_HASHTAG = /\B(#[á-úÁ-Úä-üÄ-Üa-zA-Z0-9_]+)/g; //regex for #hashtags

	let tweet = text,
		searchlink; //search link for hashtags

	//Hashtag Search link
	if (parameters.searchWithHashtags) {
		//this is the search with hashtag
		searchlink = "https://twitter.com/hashtag/";
	} else {
		//this is a more global search including hashtags and the word itself
		searchlink = "https://twitter.com/search?q=";
	}

	//turn URLS in the tweet into... working urls
	if (parameters.parseUrls) {
		tweet = tweet.replace(REGEX_URL, function (url) {
			let link = generateLink(url, parameters.urlClass, parameters.target, url);

			return url.replace(url, link.outerHTML);
		});
	}

	//turn @users in the tweet into... working urls
	if (parameters.parseUsers) {
		tweet = tweet.replace(REGEX_USER, function (user) {
			let userOnly = user.slice(1),
				url = `http://twitter.com/${userOnly}`,
				link = generateLink(url, parameters.userClass, parameters.target, user);

			return user.replace(user, link.outerHTML);
		});
	}

	//turn #hashtags in the tweet into... working urls
	if (parameters.parseHashtags) {
		tweet = tweet.replace(REGEX_HASHTAG, function (hashtag) {
			let hashtagOnly = hashtag.slice(1),
				url = searchlink + hashtagOnly,
				link = generateLink(url, parameters.hashtagClass, parameters.target, hashtag);

			return hashtag.replace(hashtag, link.outerHTML);
		});
	}

	return tweet;
});

Vue.filter('tagParams', (value) => {
	switch (value) {
		case 'Hot': return { icon: 'mdi-fire', color: 'error', text: value, };
		case 'Significant': return { icon: 'mdi-crown', color: 'warning', text: value, };
		case 'Upcoming': return { icon: 'mdi-arrow-right', color: 'success', text: value, };
		default: return false;
	}
});
