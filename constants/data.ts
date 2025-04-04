export const initialFormState = {
  name: "",
  mobile: "",
  email: "",
  location: { city: "", state: "" },
  file: null,
  agreed: false,
};

export const stateToCities: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Kakinada",
    "Nellore",
    "Tirupati",
    "Rajahmundry",
    "Eluru",
    "Chittoor",
    "Anantapur",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Munger",
    "Darbhanga",
    "Begusarai",
    "Nalanda",
    "Purnia",
    "Arrah",
  ],
  Delhi: [
    "New Delhi",
    "Dwarka",
    "Connaught Place",
    "Saket",
    "Vasant Kunj",
    "Rohini",
    "Pitampura",
    "Karol Bagh",
    "Lajpat Nagar",
    "Green Park",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Mangaluru",
    "Hubli",
    "Dharwad",
    "Belagavi",
    "Kalaburagi",
    "Ballari",
    "Udupi",
    "Shimoga",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Thane",
    "Solapur",
    "Kolhapur",
    "Shirdi",
    "Navi Mumbai",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Vellore",
    "Tiruppur",
    "Cuddalore",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Allahabad",
    "Gorakhpur",
    "Bareilly",
    "Noida",
    "Meerut",
    "Moradabad",
  ],
  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Siliguri",
    "Durgapur",
    "Asansol",
    "Medinipur",
    "Kalyani",
    "Chinsurah",
    "Malda",
    "Berhampore",
  ],
};