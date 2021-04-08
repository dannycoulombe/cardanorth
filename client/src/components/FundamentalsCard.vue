<template>
	<ScrollableCard title="Fundamentals" url="/custom/fundamentals" empty-text="No info yet" class="fill-height">
		<template v-slot:body="coin">
			<v-card-text>

				<v-row>
					<v-col cols="12" md="6" class="d-flex align-center">
						<h1 class="d-flex align-center">
							<span v-text="$options.filters.toMoney(coin.data.price)"></span>
							<PercentChip v-model="coin.data.percent_change_24h" />
						</h1>
					</v-col>
					<v-col cols="12" md="6" class="d-flex align-center">
						<h2>Rank: {{ coin.data.cmc_rank }}</h2>
					</v-col>
				</v-row>

				<v-row class="mt-4">
					<v-col cols="12" md="6">
						<h4>Market Cap</h4>
						<div class="price" v-text="$options.filters.toMoney(coin.data.market_cap, 0)"></div>
					</v-col>
					<v-col cols="12" md="6">
						<h4>Volume <v-chip label x-small>24h</v-chip></h4>
						<div class="price" v-text="$options.filters.toLargeAmount(coin.data.volume_24h, 0)"></div>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" md="6">
						<h4>Circulating Supply</h4>
						<div class="price" v-text="$options.filters.toLargeAmount(coin.data.circulating_supply, 0)"></div>
					</v-col>
					<v-col cols="12" md="6">
						<h4>Max Supply</h4>
						<div class="price" v-text="$options.filters.toLargeAmount(coin.data.max_supply, 0)"></div>
					</v-col>
				</v-row>
			</v-card-text>
		</template>
	</ScrollableCard>
</template>

<script>
import ScrollableCard from "./ScrollableCard";
import PercentChip from "./PercentChip";

export default {
	name: "FundamentalsCard",

	components: { ScrollableCard, PercentChip, },
}
</script>
