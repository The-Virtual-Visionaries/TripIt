[
  {
    day: 1,
    morning: [
      {
        name: "Waveboarding",
        description: "Day 1 Activity 1 Description",
        location: "Gem Street"
      },
      {
        name: "Bungee Jumping",
        description: "Day 1 Activity 2 Description",
        location: "Lob St."
      },
    ],
    afternoon: [
        ...
      ],
      night: [
        ...
      ],
  },
  {
    day: 2,
    ...
  },
];

// itinerary = { destination, startDate, endDate, finalised, uid }
// activities = { day, description, startTime, endTime, location, name }

const handleCreatingProject = () => {
    if (title == "" || description == "" || tag == null) {
      Alert.alert("Missing fields.");
    } else {
      const user = getDoc(doc(db, "users", auth.currentUser.uid));
      user
        .then((q) => {
          addDoc(collection(db, "projects"), {
            userid: auth.currentUser.uid,
            title: title,
            tag: tag,
            description: description,
            username: q.data().username,
          }).catch((error) => alert(error.message));
          Alert.alert("Project created.");
          navigation.popToTop();
        })
        .catch((e) => alert(e.message));
    }
  };

const handleCreatingItinerary = () => {
    if (destination == "" || startDate == "" || endDate == "") {
      Alert.alert("Missing fields.");
    } else {
        addDoc(collection(db, "itineraries"), {
            uid: auth.currentUser.uid,
            destination: destination,
            startDate: startDate,
            endDate: endDate,
        }).catch((error) => alert(error.message));
    }


// const handleEditingItinerary = () => {



const handleDeletingItinerary = () => {




const handleCreatingActivity = () => {
    if (day == "" || timing == "" || description == "" || activity_type == "" || activity_name == "") {
      Alert.alert("Missing fields.");
    } else {
        addDoc(collection(db, "activities"), {
            iid: iid,
            day: day,
            timing: timing,
            description: description,
            activity_type: activity_type,
            activity_name: activity_name,
        }).catch((error) => alert(error.message));
    }
}



const handleUpdatingActivity = () => {

    
// based on array of aid of deleted things, add to array when deleting only after checking that deleted has aid value
const handleDeletingActivity = (array) => {
    for (let i = 0; i < array.length; i++) {
        deleteDoc(doc(db, "activities", array[i]))
    }
}



const firestoreToJson = (doc) => {



const JsonToFirestore = (json) => {
