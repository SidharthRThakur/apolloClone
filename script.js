// Fetch data from the doctors.json file
fetch("doctors.json")
  .then((response) => response.json())
  .then((doctors) => {
    const container = document.getElementById("doctors-container");

    doctors.forEach((doctor) => {
      const card = document.createElement("div");
      card.className = "doctor-card";

      card.innerHTML = `
        <img src="${doctor.image}" width="123" alt="Doctor Image" />
        <h3>${doctor.name}</h3>
        <p><strong>Speciality:</strong> ${doctor.speciality}</p>
        <p><strong>Experience:</strong> ${doctor.experience}</p>
        <p><strong>Qualification:</strong> ${doctor.qualification}</p>
        <p><strong>Fees:</strong> ₹${doctor.fees}</p>
        `;

      container.appendChild(card);
      //   width added to control the piture size
    });
  })
  .catch((error) => console.error("Error loading doctors:", error));

// let buy = document.getElementsByClassName("#main");
// buy.addEventlistener("click", function () {});

//pagination
// data feetching from the doctors.jason
fetch("doctors.json")
  .then((response) => response.json()) //it wil comvert into JSON format
  .then((doctors) => {
    console.log(doctors); // to chekc weeather data is right
  })
  .catch((error) => console.error("Error Loading doctors", error));

//selecting basis variable for pagination
const doctorsPerPage = 10; // to show 10 doctors per page
let currentPage = 1; // by default page no.
// now will create a funciton that will show doctors list page wise
//first of all need to clear the old data
function displayDoctors(page, doctors) {
  const container = document.getElementById("doctors-container");
  container.innerHTML = ""; // Purana data clear karega

  let start = (page - 1) * doctorsPerPage;
  let end = start + doctorsPerPage;
  let paginatedDoctors = doctors.slice(start, end); // Current page ka data

  paginatedDoctors.forEach((doctor) => {
    const card = document.createElement("div");
    card.className = "doctor-card";
    card.innerHTML = `
      <img src="${doctor.image}" width="123" alt="Doctor Image" />
      <h3>${doctor.name}</h3>
      <p><strong>Speciality:</strong> ${doctor.speciality}</p>
      <p><strong>Experience:</strong> ${doctor.experience}</p>
      <p><strong>Qualification:</strong> ${doctor.qualification}</p>
      <p><strong>Fees:</strong> ₹${doctor.fees}</p>
    `;
    container.appendChild(card);
  });
}

// previous button
function updatePagination(doctors) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  let totalPages = Math.ceil(doctors / doctorsPerPage);

  let prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      displayDoctors(currentPage, doctors);
      updatePagination(doctors);
    }
  };

  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.className = currentPage === i ? "active" : "";
    pageButton.onclick = () => {
      currentPage = i;
      displayDoctors(currentPage, doctors);
      updatePagination(doctors);
    };
    paginationContainer.appendChild(pageButton);
  }

  let nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayDoctors(currentPage, doctors);
      updatePagination(doctors);
    }
  };

  paginationContainer.appendChild(nextButton);
}
fetch("doctors.json")
  .then((response) => response.json())
  .then((doctors) => {
    displayDoctors(currentPage, doctors); // to show  First page
    updatePagination(doctors.length); //  Pagination buttons update
  })
  .catch((error) => console.error("Error loading doctors:", error));
