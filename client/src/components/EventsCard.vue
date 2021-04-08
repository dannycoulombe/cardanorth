<template>
	<ScrollableCard title="Events" url="/items/events" :params="params" :empty-text="filters === 'upcoming' ? 'No upcoming event yet' : 'No past event yet'" class="fill-height">
		<template v-slot:filters>
			<v-btn-toggle v-model="filters" class="my-n4" group>
				<v-btn value="upcoming" small>
					Upcoming
				</v-btn>
				<v-btn value="past" small>
					Past
				</v-btn>
			</v-btn-toggle>
		</template>
		<template v-slot:body="events">
			<v-list three-line>
				<template v-for="(event, eventIdx) in events.data">
					<v-divider v-if="eventIdx > 0" :key="event.id + '_sep'" />
					<v-list-item :key="event.id" :to="getEventUrl(event)">
						<v-list-item-icon>
							<v-card :color="$moment(event.date) > $moment() ? 'primary' : 'secondary'" class="white--text pa-3 px-5 text-center">
								<div>{{ $moment(event.date).format('MMM') }}</div>
								<h2>{{ $moment(event.date).format('DD') }}</h2>
							</v-card>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-html="event.title"></v-list-item-title>
							<v-list-item-subtitle v-html="event.excerpt"></v-list-item-subtitle>
							<v-list-item-action-text v-if="event.tags && event.tags.length > 0">
								<v-chip :key="tagIdx" v-for="(tag, tagIdx) in event.tags" :color="$moment(event.date) > $moment() ? $options.filters.tagParams(tag).color : 'secondary'" x-small>
									<v-icon v-text="$options.filters.tagParams(tag).icon" left small>mdi-fire</v-icon>
									<span v-text="$options.filters.tagParams(tag).text"></span>
								</v-chip>
							</v-list-item-action-text>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</template>
	</ScrollableCard>
</template>

<script>
import ScrollableCard from "./ScrollableCard";

export default {
	name: "EventsCard",

	components: { ScrollableCard, },

	methods: {

		getEventUrl(event) {
			return '/event/' + event.id;
		},
	},

	computed: {

		params() {
			const filter = '{ "date": { "' + (this.filters === 'upcoming' ? '_gte' : '_lt') + '": "$NOW" }}';
			return {
				filter,
				sort: (this.filters === 'upcoming' ? '' : '-') + 'date',
			};
		},
	},

	data() {
		return {
			filters: 'upcoming',
		};
	},
}
</script>
