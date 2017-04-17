export default class Blog {
	'title': string
	'name': string
	'total_posts': number
	'posts': number
	'url': string
	'updated': number
	'description': string
	'is_nsfw': boolean
	'ask': boolean
	'ask_page_title': string
	'ask_anon': boolean
	'submission_page_title': string
	'can_submit': boolean
	'followed': boolean
	'can_send_fan_mail': boolean
	'is_blocked_from_primary': boolean
	'share_likes': boolean
	'likes': number
	'submission_terms': {
		'accepted_types': [
			'text',
			'photo',
			'quote',
			'link',
			'video'
		],
		'tags': string[],
		'title': string
		'guidelines': string
	}
	'subscribed': boolean
	'can_subscribe': boolean
}
