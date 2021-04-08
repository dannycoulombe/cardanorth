<template>
	<v-row class="fill-height ma-0 py-2">
		<v-col cols="12" md="8" lg="9">
			<v-sheet color="transparent" class="fill-height d-flex flex-column">

				<!-- TRADING VIEW -->
				<v-slide-y-reverse-transition>
					<TradingViewCard v-if="seqAnim[0]" />
				</v-slide-y-reverse-transition>

				<v-row style="flex: 1" class="fill-height mt-0">

					<!-- EVENTS -->
					<v-col cols="12" md="6" lg="4">
						<v-slide-y-reverse-transition>
							<EventsCard v-if="seqAnim[1]" />
						</v-slide-y-reverse-transition>
					</v-col>

					<!-- NEWS -->
					<v-col cols="12" md="12" lg="4">
						<v-slide-y-reverse-transition>
							<NewsCard v-if="seqAnim[2]" />
						</v-slide-y-reverse-transition>
					</v-col>

					<!-- SOCIAL MEDIAS -->
					<v-col cols="12" md="6" lg="4">
						<v-slide-y-reverse-transition>
							<SocialMediaCard v-if="seqAnim[3]" />
						</v-slide-y-reverse-transition>
					</v-col>
				</v-row>
			</v-sheet>
		</v-col>
		<v-col cols="12" md="4" lg="3">
			<v-slide-y-reverse-transition>
				<FundamentalsCard v-if="seqAnim[4]" />
			</v-slide-y-reverse-transition>
		</v-col>
	</v-row>
</template>

<script>
import TradingViewCard from "../../components/TradingViewCard";
import EventsCard from "../../components/EventsCard";
import NewsCard from "../../components/NewsCard";
import SocialMediaCard from "../../components/SocialMediaCard";
import FundamentalsCard from "../../components/FundamentalsCard";
import SequencedAnimation from "../../mixins/SequencedAnimation";

export default {
	name: "Trends",

	components: { TradingViewCard, EventsCard, NewsCard, SocialMediaCard, FundamentalsCard, },

	mixins: [ SequencedAnimation(5, 100) ],
}
</script>
