export const quizData = [
  {
    questionTopic: "Scale",
    questionText: "How many users will use your application?",
    answerOptions: [
      { answerText: "1-10 Users", price: 13000 },
      { answerText: "11-50 Users", price: 15000 },
      { answerText: "51-100 Users", price: 20000 },
      { answerText: "101-500 Users", price: 35000 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: true,
    selectionType: "single-select",
  },
  {
    questionTopic: "Purpose",
    questionText: "What will you use it for?",
    answerOptions: [
      { answerText: "Dashboard", price: 5000 },
      { answerText: "E-Commerce", price: 5000 },
      { answerText: "Bidding Website", price: 5000 },
      { answerText: "Property Listings", price: 5000 },
      { answerText: "Rental Management", price: 5000 },
      { answerText: "Attendance Tracking", price: 5000 },
      { answerText: "Online Courses", price: 5000 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: true,
    selectionType: "single-select",
  },
  {
    questionTopic: "Management",
    questionText:
      "Would you like to be able edit content of your application by yourself? (CMS)",
    answerOptions: [
      { answerText: "Yes", price: 5000 },
      { answerText: "No", price: 0 },
    ],
    isCompulstory: true,
    selectionType: "single-select",
  },
  {
    questionTopic: "Appearance",
    questionText:
      "How pretty would you like your application to appear towards users?",
    answerOptions: [
      { answerText: "Basic", price: 1500 },
      { answerText: "Slick", price: 2500 },
      { answerText: "Polished", price: 2900 },
    ],
    isCompulstory: true,
    selectionType: "single-select",
  },
  {
    questionTopic: "Users",
    questionText: "How will people use your application?",
    answerOptions: [
      { answerText: "FB sign up", price: 500 },
      { answerText: "Google sign up", price: 500 },
      { answerText: "Twitter sign up", price: 500 },
      { answerText: "Email sign up", price: 500 },
      { answerText: "2-factor authentication", price: 500 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: false,
    selectionType: "multi-select",
  },
  {
    questionTopic: "Content Generation",
    questionText: "How will you generate content to your application?",
    answerOptions: [
      { answerText: "Activity Feeds", price: 1000 },
      { answerText: "File Uploading", price: 1200 },
      { answerText: "User Profiles", price: 1200 },
      { answerText: "In-app Messaging", price: 1400 },
      { answerText: "Audio/Video Streaming", price: 1600 },
      { answerText: "Global Search", price: 2000 },
      { answerText: "Advanced Filters & Search", price: 2500 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: false,
    selectionType: "multi-select",
  },
  {
    questionTopic: "Payment Integration",
    questionText: "How would you like the web app to process payments?",
    answerOptions: [
      { answerText: "Stripe (Credit Card)", price: 1700 },
      { answerText: "PayPal", price: 1500 },
      { answerText: "Paymark", price: 1400 },
      { answerText: "Bank Transfer", price: 1200 },
      { answerText: "Paystation", price: 1400 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: false,
    selectionType: "multi-select",
  },
];
