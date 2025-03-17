const BaseActivity : Activity = {
	id: crypto.randomUUID(),
  title: "",
  date: new Date().toISOString(),
  description: "",
  category: "",
  isCancelled: false,
  city: "",
  venue: "",
  latitude: 0,
  longitude: 0
}

export default BaseActivity;