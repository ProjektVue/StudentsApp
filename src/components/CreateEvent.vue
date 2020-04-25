<template>
	<section id="settings">
		<div class="col1">
			<h3>Create Event</h3>
			<p>Create New Event</p>
			<div class="create-post">
				<form @submit.prevent>
					<label for="name">Name</label>
					<input v-model.trim="event.name" id="name" />
					<label for="name">Place</label>
					<input v-model.trim="event.name" id="name" />
					<label for="name">Date</label>
					<datepicker
						v-model="event.date"
						name="uniquename"
					></datepicker>
					<label for="name">Event Start Time</label>
					<input type="time" id="appt" name="appt" />
					<label for="description">Description</label>
					<textarea v-model.trim="event.content"></textarea>
					<button
						@click="createPost"
						:disabled="event.content == ''"
						class="button"
					>
						Add Event
					</button>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
const fb = require("../firebaseConfig.js");
import Datepicker from "vuejs-datepicker";

export default {
	components: {
		Datepicker
	},
	data() {
		return {
			event: {
				content: "",
				name: "",
				place: "",
				date: "",
				description: ""
			}
		};
	},
	computed: {
		...mapState(["events"])
	},
	methods: {
		createPost() {
			fb.eventsCollection
				.add({
					createdOn: new Date(),
					content: this.post.content,
					userId: this.currentUser.uid,
					userName: this.userProfile.name,
					comments: 0,
					likes: 0
				})
				.then(ref => {
					this.event.content = "";
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

http://dev.virtualearth.net/REST/v1/Locations/UK/{postalCode}?includeNeighborhood={includeNeighborhood}&include={includeValue}&maxResults={maxResults}&key={BingMapsAPIKey}
